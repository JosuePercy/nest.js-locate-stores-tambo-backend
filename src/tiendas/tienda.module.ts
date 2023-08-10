import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaService } from './tienda.service';
import { TiendaController } from './tienda.controller';
import { Tiendas } from './entities/tienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tiendas])],
  providers: [TiendaService],
  controllers: [TiendaController],
})
export class TiendaModule {}
