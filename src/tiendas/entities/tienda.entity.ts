import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tiendas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tienda: string;

  @Column()
  tipo: string;

  @Column()
  jefes_zonal: string;

  @Column()
  administrador: string;

  @Column()
  rpe_enter_administrador: string;

  @Column()
  telefono_personal_adm: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column()
  direccion: string;

  @Column()
  distrito: string;

  @Column()
  gerente_zonal: string;

  @Column()
  dias_atencion: string;

  @Column()
  apertura_local: string;

  @Column()
  cierre_local: string;

  @Column()
  tiendas_ripley: string;

  @Column()
  horario_permitido_de_recepcion: string;

  @Column()
  state: boolean;
}
