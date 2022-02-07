import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenException } from 'src/exceptions/http-exception.filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.mail) throw new ForbiddenException();
    return this.userService.create(createUserDto);
  }

  //모든 회원
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //회원 한명 가져오기
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  //회원정보 업데이트
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserInfo(id, updateUserDto);
  }

  @Patch(':id')
  update_(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  //탈퇴
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
