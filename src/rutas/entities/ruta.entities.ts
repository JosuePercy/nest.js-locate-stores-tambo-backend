import { TiendaRutaDto } from '../dto/rutasDiarias';

export interface RutasDiarias {
  id?: number;
  id_ruta: number;
  id_usuario: number;
  fecha_registro?: string;
  estado?: boolean;
}

export interface RutasDiariasTiendas {
  id: number;
  id_rutas_diarias: number;
  id_tiendas: number;
  cantidad_de_jabas: number;
  estado?: boolean;
}

export interface Rutas {
  id?: string;
  nombre?: string;
  fecha_creacion?: string;
  estado?: 'active' | 'inactive';
}

export interface RutasTiendas {
  ruta: Rutas;
  tiendas: TiendaRutaDto[];
}
