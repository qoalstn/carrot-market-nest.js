import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(inputData: CreateUserDto): Promise<object> {
    // console.log(inputData);
    const { mail, name, pass, addr } = inputData;

    const existUser = await this.findOneByMail(mail);

    if (existUser) {
      return { status: 409, msg: 'already exist mail' };
    } else {
      const data = await this.userRepo.insert({
        mail,
        name,
        pass,
        addr,
        created_at: new Date(),
      });

      const createdUser = await this.findOneById(data.identifiers[0].id);

      if (data.identifiers.length !== 1) return { status: 500, msg: null };

      return { status: 201, data: createdUser };
    }
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

  async findOneById(id: number) {
    const data = await this.userRepo.find({ id });

    return data.length > 0 ? data : null;
  }

  async findOneByMail(mail: string): Promise<UserEntity[]> {
    const data = await this.userRepo.find({ mail });

    return data.length > 0 ? data : null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
