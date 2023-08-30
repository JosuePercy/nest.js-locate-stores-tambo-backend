import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async AllUsers() {
    const listUsers = await this.dataSource.query(`select * from users`);
    console.log('listUsers ==>', listUsers);
    return listUsers;
  }

  // async insertTienda(register: UserDto) {
  //   /* TODO: agregar sentencia sql o encontrar otro metodo */
  //   await this.dataSource.query(
  //     `INSERT INTO users(first_name, second_name , first_last_name, second_last_name, password  , mail, phone, birthday, gender, date_record, role, state)
  //                    value (?,?,?,?,?,?,?,?,?,?,?,?)`,
  //     [
  //       register.first_name,
  //       register.second_name,
  //       register.first_last_name,
  //       register.second_last_name,
  //       register.password,
  //       register.mail,
  //       register.phone,
  //       register.birthday,
  //       register.gender,
  //       register.date_record,
  //       register.role,
  //       register.state,
  //     ],
  //   );

  //   return { message: 'Tienda insertada exitosamente' };
  // }
}
