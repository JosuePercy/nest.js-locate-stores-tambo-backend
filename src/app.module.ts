import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { TiendaModule } from './tiendas/tienda.module';
import { RutasModule } from './rutas/rutas.module';
import { UserModule } from './users/user.module';
import { LoginModule } from './authentication/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_MYSQL_HOST,
      port: +process.env.DB_MYSQL_PORT,
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD,
      database: process.env.DB_MYSQL_NAME_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    TiendaModule,
    RutasModule,
    LoginModule,
  ],
})
export class AppModule {}
