import {
  IsString,
  MinLength,
  Min,
  IsDefined,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { BeforeUpdate } from 'typeorm';

export class TiendaDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(30)
  tienda: string;

  @IsString()
  @MinLength(10)
  tipo: string;

  @IsString()
  @MinLength(20)
  jefes_zonal: string;

  @IsString()
  @MinLength(30)
  administrador: string;

  @IsString()
  @Min(11)
  rpe_enter_administrador: string;

  @IsString()
  @MinLength(11)
  telefono_personal_adm: string;

  @IsString()
  @MinLength(30)
  latitud: string;

  @IsString()
  @MinLength(30)
  longitud: string;

  @IsString()
  @MinLength(200)
  direccion: string;

  @IsString()
  @MinLength(50)
  distrito: string;

  @IsString()
  @MinLength(20)
  gerente_zonal: string;

  @IsString()
  @MinLength(30)
  dias_atencion: string;

  @IsString()
  @MinLength(20)
  apertura_local: string;

  @IsString()
  @MinLength(20)
  cierre_local: string;

  @IsString()
  @MinLength(10)
  tiendas_ripley: string;

  @IsString()
  @MinLength(50)
  horario_permitido_de_recepcion: string;

  @IsDefined()
  @IsBoolean()
  state: boolean;
}
