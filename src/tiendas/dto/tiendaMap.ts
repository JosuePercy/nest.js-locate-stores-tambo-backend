export interface Schedule {
  open: string;
  close: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface TiendaMap {
  id: number;
  name: string;
  direction: string;
  schedule: Schedule;
  district: string;
  days_attention: string;
  coordinate: Coordinate;
}
