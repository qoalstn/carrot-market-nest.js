import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator'; // 유효성 검사 패키지

//class-validator와 같은 데코레이터를 추가 할 수 있으므로 클래스 사용을 권장.
//인터페이스를 사용하면 @IsString()@Max(20)와 같은 유효성 검사가 인터페이스 컨텍스트 외부에서만 가능하다.
//https://github.com/nestjs/nest/issues/1228
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

export class CreateUserResDto {
  @IsNumber()
  status: number;

  @IsNumber()
  insertId: number;
}
