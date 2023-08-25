export interface TiendasDto {
  id_tienda: number;
  cantidad_jabas: number;
}

export interface RutasDiariasDto {
  id_usuario: number;
  id_rutas_diarias: number;
  tiendas: TiendasDto[];
}

export interface TiendaRutaDto {
  id?: string;
  tienda?: string;
  latitud?: string;
  longitud?: string;
  direccion?: string;
  apertura_local?: string;
  cierre_local?: string;
  distrito?: string;
  dias_atencion?: string;

  ruta_id?: string;
  ruta_name?: string;
  ruta_fecha_creacion?: string;
}
