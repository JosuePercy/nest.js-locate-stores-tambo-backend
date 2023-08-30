import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RutasService } from './rutas.service';

import { Logger } from '@nestjs/common';
import { RutasDiariasDto } from './dto/rutasDiarias';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Get()
  findAllDTO() {
    Logger.log('pruebas', 'TiendasController');
    return this.rutasService.findAllRutas();
  }
  @Get(':id')
  async findRutasName(@Param('id') id: number) {
    return this.rutasService.findTiendasByRutaId(+id);
  }

  /* agregar metodo post */
  @Post('rutas-diarias')
  async insertTienda(@Body() rutasDiarias: RutasDiariasDto) {
    // tiendasInfo.id_rutas_diarias = id;
    // return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
    console.log('rutasDiarias ==> ', rutasDiarias);
    return this.rutasService.insertTienda(rutasDiarias);
  }

  @Get('today/:id')
  async findStoreForUser(@Param('id') id: number) {
    return this.rutasService.findStoreForUser(+id);
  }
}
