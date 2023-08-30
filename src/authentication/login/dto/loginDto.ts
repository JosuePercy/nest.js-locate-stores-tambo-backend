import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  user: string;
  @IsNotEmpty()
  password: string;
}
