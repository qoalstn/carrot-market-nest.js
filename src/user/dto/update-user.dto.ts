import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // 일반적으로 데이터 수정시의 DTO는 삽입시의 DTO에 종속된다. PartialType(CreateUserDto)를 통해 CreateUserDto를 재사용 할 수 있다.

  @IsNumber()
  id: number;
}
