import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../roles/roles';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
