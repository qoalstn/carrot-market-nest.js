import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  UnauthorizedException,
} from 'src/exceptions/http-exception.filter';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(inputData: CreateUserDto) {
    console.log(inputData);
    const { mail, name, pass, addr } = inputData;

    let newId = '';
    const existUser = await this.findOneByMail(mail);
    // console.log(1, existUser);
    if (existUser) throw new ConflictException();
    await bcrypt.genSalt(10, async (err, salt) => {
      if (err) throw new UnauthorizedException();
      bcrypt.hash(pass, salt, async (err, hash) => {
        if (err) new UnauthorizedException();

        const result = await this.userRepo.insert({
          mail,
          name,
          pass: hash,
          addr,
          created_at: new Date(),
        });
        // console.log(5, result);

        // const newUser = await this.findOneByMail(mail);
        // console.log(2, newUser);

        // if (data.identifiers.length !== 1) return { status: 500, msg: null };
      });
    });
    return { status: 201, data: newId };
  }

  async updateUserInfo(id: number, inputData: UpdateUserDto): Promise<object> {
    // console.log('updateUserInfo : ', inputData);
    const { mail, name, pass, addr } = inputData;

    const existUser = await this.findOneById(id);

    if (!existUser) {
      return { status: 400, msg: 'not found user' };
    } else {
      const data = await getConnection()
        .createQueryBuilder()
        .update(UserEntity)
        .set({ mail, name, pass, addr })
        .where('id = :id', { id })
        .execute();

      return data
        ? { status: 200, data }
        : { status: 500, msg: 'update failed' };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: number): Promise<object> {
    return await this.userRepo.findOne({ id });
  }

  async findOneByMail(mail: string): Promise<object> {
    return await this.userRepo.findOne({ mail });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
