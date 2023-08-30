import { Controller, Get, Logger, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllDTO() {
    Logger.log('pruebas', 'loginController');
    return this.userService.AllUsers();
  }

  /* agregar metodo post */
  // @Post('user')
  // async insertUser(@Body() user: UserDto) {
  //   // tiendasInfo.id_rutas_diarias = id;
  //   // return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
  //   console.log('User ==> ', user);
  //   return this.userService.insertTienda(user);
  // }
}
