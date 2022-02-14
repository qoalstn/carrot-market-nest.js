import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from 'src/exceptions/http-exception.filter';
import { PayLoadUserDto, TokenDto } from 'src/user/dto/read-user.dto';
import { UserService } from 'src/user/user.service';
// import bcrypt from 'bcrypt'; //TypeError: Cannot read property 'compareSync' of undefined
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(mail: string, pass: string): Promise<any> {
    // console.log('validateUser : ', mail, pass);

    const existUser = await this.usersService.findOneByMail(mail);
    if (!existUser) throw new ForbiddenException();

    const match = bcrypt.compare(pass, existUser.pass);

    if (match) {
      const { pass, ...user } = existUser;

      return user;
    } else {
      return null;
      // throw new ForbiddenException();
    }
  }

  async login(user: PayLoadUserDto): Promise<TokenDto> {
    const payload = { id: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
