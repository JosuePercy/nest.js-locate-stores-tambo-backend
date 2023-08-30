import { Injectable } from '@nestjs/common';
import { Response, BadResponse } from 'src/utils/interface/response';
import { DataSource } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(private dataSource: DataSource) {}

  async login(mail: string, password: string): Promise<Response> {
    try {
      const responseQueryLogin = await this.dataSource.query(
        'SELECT * FROM users where mail = ? and password = ?',
        [mail, password],
      );

      console.log('list =>>>', typeof responseQueryLogin);

      if (responseQueryLogin.length === 0) {
        let erros: BadResponse[] = [
          {
            field: 'user',
            message:
              'El correo electrónico o la contraseña que ingresaste no está conectado a una cuenta.',
          },
        ];

        let response: Response = {
          status: 'error',
          errors: erros,
        };

        return response;
        //throw new Error('credenciales incorrectas');
      }
      let response: Response = {
        status: 'ok',
        data: responseQueryLogin,
      };

      return response;
    } catch (error) {
      throw new Error('Dato incorrecto');
    }
  }
}
