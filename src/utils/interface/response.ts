export interface Response {
  status: string;
  data?: [] | object | null;
  errors?: BadResponse[];
}

export interface BadResponse {
  field: string;
  message: string;
}
