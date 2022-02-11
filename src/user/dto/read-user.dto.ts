import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  mail: string;

  @IsString()
  pass: string;
}

export class PayLoadUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
