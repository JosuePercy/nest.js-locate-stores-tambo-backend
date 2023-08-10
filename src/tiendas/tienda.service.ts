import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tiendas } from './entities/tienda.entity';
import { TiendaDto } from './dto/tienda.modul';
import { TiendaMap } from './dto/tiendaMap';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Tiendas)
    private readonly tiendasRepository: Repository<Tiendas>,
  ) {}
  // async findAll(): Promise<TiendaDto[]> {
  //   let list = await this.tiendasRepository.query('select * from tiendas', [2]);

  //   return list;
  // }

  async findAllDTO(): Promise<TiendaMap[]> {
    const list: Tiendas[] = await this.tiendasRepository.query(
      `SELECT 
        id, 
        tienda, 
        direccion, 
        apertura_local, 
        cierre_local, 
        distrito, 
        horario_permitido_de_recepcion, 
        longitud, latitud 
      FROM tiendas`,
    );
    //console.log('list ==> ', list);

    const tiendas: TiendaMap[] = list.map((tienda) => {
      return {
        id: tienda.id,
        name: tienda.tienda,
        direction: tienda.direccion,
        schedule: {
          open: tienda.apertura_local,
          close: tienda.cierre_local,
        },
        district: tienda.distrito,
        days_attention: tienda.dias_atencion,
        coordinate: {
          lat: parseFloat(tienda.latitud),
          lng: parseFloat(tienda.longitud),
        },
      };
    });

    return tiendas;
  }

  async findAllTiendas_Ruta(): Promise<TiendaMap[]> {
    const list: Tiendas[] = await this.tiendasRepository.query(
      `SELECT 
        t.id,
        t.tienda,
        t.latitud,
        t.longitud 
      From rutas_diarias RD
      INNER JOIN rutas_diarias_tiendas RDT
      ON RD.id = RDT.id_rutas_diarias
      INNER JOIN tiendas t ON t.id = RDT.id_tiendas 
      WHERE 
        RD.id_ruta = 7 AND 
        DATE_FORMAT(RD.fecha_registro, '%Y/%m/%d') = DATE_FORMAT('2023/08/06', '%Y/%m/%d')`,
    );
    //console.log('list ==> ', list);

    const tiendas: TiendaMap[] = list.map((tienda) => {
      return {
        id: tienda.id,
        name: tienda.tienda,
        direction: tienda.direccion,
        schedule: {
          open: tienda.apertura_local,
          close: tienda.cierre_local,
        },
        district: tienda.distrito,
        days_attention: tienda.dias_atencion,
        coordinate: {
          lat: parseFloat(tienda.latitud),
          lng: parseFloat(tienda.longitud),
        },
      };
    });

    return tiendas;
  }

  async create(tiendaDto: TiendaDto[]): Promise<TiendaDto[]> {
    const tiendasEntity: TiendaDto[] = [];

    await Promise.all(
      tiendaDto.map(async (item, index) => {
        console.log('item ==> ', item, index);
        const tienda = this.getTiendaEntity(item);

        if (this.validateTienda(item)) {
          const status = await this.tiendasRepository.save(tienda);
          tienda.id = status.id;
        }

        tiendasEntity.push(tienda);
      }),
    );

    console.log('tiendasEntity => ', tiendasEntity);

    return tiendasEntity;
    // return new Promise((resolve, reject) => {
    //   resolve(tiendasTmp);
    // });
  }

  getTiendaEntity(item) {
    const tienda = new Tiendas();
    tienda.id = item.id;
    tienda.tienda = item.tienda + '';
    tienda.tipo = item.tipo + '';
    tienda.jefes_zonal = item.jefes_zonal + '';
    tienda.administrador = item.administrador + '';
    tienda.rpe_enter_administrador = item.rpe_enter_administrador + '';
    tienda.telefono_personal_adm = item.telefono_personal_adm + '';
    tienda.latitud = item.latitud + '';
    tienda.longitud = item.longitud + '';
    tienda.direccion = item.direccion + '';
    tienda.distrito = item.distrito + '';
    tienda.gerente_zonal = item.gerente_zonal + '';
    tienda.dias_atencion = item.dias_atencion + '';
    tienda.apertura_local = item.apertura_local + '';
    tienda.cierre_local = item.cierre_local + '';
    tienda.tiendas_ripley = item.tiendas_ripley + '';
    tienda.horario_permitido_de_recepcion =
      item.horario_permitido_de_recepcion + '';
    tienda.state = item.state;
    return tienda;
  }
  validateTienda(item): boolean {
    if (
      item.latitud &&
      item.latitud != undefined &&
      item.latitud != '' &&
      item.longitud &&
      item.longitud != undefined &&
      item.longitud != '' &&
      item.tienda &&
      item.tienda != undefined &&
      item.tienda != '' &&
      item.tipo &&
      item.tipo != undefined &&
      item.tipo != '' &&
      item.direccion &&
      item.direccion != undefined &&
      item.direccion != '' &&
      item.distrito &&
      item.distrito != undefined &&
      item.distrito != '' &&
      item.dias_atencion &&
      item.dias_atencion != undefined &&
      item.dias_atencion != '' &&
      item.apertura_local &&
      item.apertura_local != undefined &&
      item.apertura_local != '' &&
      item.cierre_local &&
      item.cierre_local != undefined &&
      item.cierre_local != '' &&
      item.horario_permitido_de_recepcion &&
      item.horario_permitido_de_recepcion != undefined &&
      item.horario_permitido_de_recepcion != ''
    ) {
      return true;
    }
    return false;
    // if (
    //   item.latitud &&
    //   item.latitud != undefined &&
    //   item.latitud != '' &&
    //   item.longitud &&
    //   item.longitud != undefined &&
    //   item.longitud != '' &&
    //   item.tienda &&
    //   item.tienda != undefined &&
    //   item.tienda != '' &&
    //   item.tipo &&
    //   item.tipo != undefined &&
    //   item.tipo != '' &&
    //   item.direccion &&
    //   item.direccion != undefined &&
    //   item.direccion != '' &&
    //   item.distrito &&
    //   item.distrito != undefined &&
    //   item.distrito != '' &&
    //   item.dias_atencion &&
    //   item.dias_atencion != undefined &&
    //   item.dias_atencion != '' &&
    //   item.apertura_local &&
    //   item.apertura_local != undefined &&
    //   item.apertura_local != '' &&
    //   item.cierre_local &&
    //   item.cierre_local != undefined &&
    //   item.cierre_local != '' &&
    //   item.horario_permitido_de_recepcion &&
    //   item.horario_permitido_de_recepcion != undefined &&
    //   item.horario_permitido_de_recepcion != ''
    // ) {
    //   return true;
    // }
    // return false;
  }
}
