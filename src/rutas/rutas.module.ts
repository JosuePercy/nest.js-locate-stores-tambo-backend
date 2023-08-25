import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { Tiendas } from '../tiendas/entities/tienda.entity'; // Asegúrate de que la ruta de importación sea correcta

@Module({
  imports: [TypeOrmModule.forFeature([Tiendas])],
  providers: [RutasService],
  controllers: [RutasController],
})
export class RutasModule {}
