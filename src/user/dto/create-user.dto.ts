import { IsEmail, IsString } from 'class-validator'; // 유효성 검사 패키지

export class CreateUserDto {
  @IsEmail()
  mail: string;

  @IsString()
  name: string;

  @IsString()
  pass: string;

  @IsString()
  addr: string;
}
