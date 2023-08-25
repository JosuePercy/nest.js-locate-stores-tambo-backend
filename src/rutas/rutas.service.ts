import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  Rutas,
  RutasDiarias,
  RutasDiariasTiendas,
  RutasTiendas,
} from './entities/ruta.entities';
import { Tiendas } from 'src/tiendas/entities/tienda.entity';
import { RutasDiariasDto, TiendaRutaDto } from './dto/rutasDiarias';

@Injectable()
export class RutasService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAllRutas() {
    const listRutas = await this.dataSource.query(
      `SELECT * from rutas  WHERE estado = "active"` /* ==> TODO: Validacion para encontrar los datos que son activos */,
    );

    return listRutas;
  }
  async findTiendasByRutaId(id: number) {
    const list: RutasDiarias[] = await this.dataSource.query(`
          SELECT
            RD.id,
            RD.id_usuario,
            RDT.id_rutas_diarias,
            RDT.id_tiendas,
            t.tienda,
            RDT.cantidad_de_jabas
          From rutas_diarias RD
          INNER JOIN rutas_diarias_tiendas RDT
          ON RD.id = RDT.id_rutas_diarias
          INNER JOIN tiendas t ON t.id = RDT.id_tiendas
          WHERE
            RD.id_ruta = ${id}
     `);
    return list;
  }

  async findStoreForUser(id: number) {
    const list: TiendaRutaDto[] = await this.dataSource.query(
      `
      SELECT 
      T.id,
      T.tienda,
      T.direccion,
      T.latitud,
      T.longitud,
      T.apertura_local,
      T.cierre_local,
      T.distrito,
      T.dias_atencion,
      rutas.id as "ruta_id",
      rutas.nombre as "ruta_name",
      DATE_FORMAT(RD.fecha_registro, '%Y/%m/%d')  as "ruta_fecha_creacion" 
      FROM rutas_diarias RD
      INNER JOIN rutas ON rutas.id = RD.id_ruta 
      INNER JOIN rutas_diarias_tiendas RDT ON RDT.id_rutas_diarias = RD.id
      INNER JOIN tiendas T ON T.id = RDT.id_tiendas 
      WHERE 
      RD.id_usuario = ? and
      DATE_FORMAT(RD.fecha_registro, '%Y/%m/%d') = DATE_FORMAT(NOW(), '%Y/%m/%d')
      
      `,
      [id],
    );

    console.log('list ==> ', list);
    const tmp = list.map((tienda) => {
      const coordinate = {
        lat: parseFloat(tienda.latitud),
        lng: parseFloat(tienda.longitud),
      };
      const schedule = {
        open: tienda.apertura_local,
        close: tienda.cierre_local,
      };

      return {
        id: tienda.id,
        name: tienda.tienda,
        coordinate: coordinate,
        direction: tienda.direccion,
        schedule: schedule,
        district: tienda.distrito,
        dias_atencion: tienda.dias_atencion,
      };
    });

    let rutasTiendas: RutasTiendas;
    console.log('ssssssss ==> ', tmp.length);
    console.log('ttttt => ', tmp);

    if (tmp.length > 0) {
      rutasTiendas = {
        ruta: {
          id: list[0].ruta_id,
          nombre: list[0].ruta_name,
          fecha_creacion: list[0].ruta_fecha_creacion,
        },
        tiendas: tmp,
      };
    }

    return rutasTiendas;
  }

  async insertTienda(rutasDiariasDto: RutasDiariasDto) {
    // Validando campos necesarios
    if (
      rutasDiariasDto.id_rutas_diarias === undefined ||
      rutasDiariasDto.id_rutas_diarias === null
    ) {
      throw new HttpException(
        { message: 'La ruta es requerido' },
        HttpStatus.FORBIDDEN,
      );
    }

    if (rutasDiariasDto.tiendas.length === 0) {
      throw new HttpException(
        { message: 'Las tiendas son requeridas' },
        HttpStatus.FORBIDDEN,
      );
    }

    if (rutasDiariasDto.tiendas.length > 0) {
      rutasDiariasDto.tiendas.map((tienda) => {
        if (tienda.id_tienda === null || tienda.id_tienda === undefined) {
          throw new HttpException(
            { message: 'Ocurrio un error al registrar las tiendas' },
            HttpStatus.FORBIDDEN,
          );
        }
      });
    }

    /* TODO: agregar sentcia sql o encontrar otro metodo */
    try {
      const responseRutasDiarias = await this.dataSource.query(
        `INSERT INTO rutas_diarias (id_ruta, id_usuario) value (?,?)`,
        [rutasDiariasDto.id_rutas_diarias, rutasDiariasDto.id_usuario],
      );

      if (responseRutasDiarias) {
        rutasDiariasDto.tiendas.map(async (tienda) => {
          await this.dataSource.query(
            `INSERT INTO rutas_diarias_tiendas (id_rutas_diarias, id_tiendas, cantidad_de_jabas) 
                                                  value (?, ?, ?)`,
            [
              responseRutasDiarias.insertId,
              tienda.id_tienda,
              tienda.cantidad_jabas,
            ],
          );
        });
      }

      return { message: 'Tienda insertada exitosamente' };
    } catch (error) {
      throw new Error('Error al insertar tienda: ' + error.message);
    }
  }
}
