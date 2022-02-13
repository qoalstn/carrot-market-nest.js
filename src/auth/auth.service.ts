import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from 'src/exceptions/http-exception.filter';
import { PayLoadUserDto, TokenDto } from 'src/user/dto/read-user.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(userId: number, password: string): Promise<any> {
  //   const user = await this.usersService.findOneById(userId);
  //   if (user[0] && user[0].pass === password) {
  //     const { pass, ...result } = user[0];
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(mail: string, pass: string): Promise<any> {
    console.log('validateUser : ', mail, pass);

    const existUser = await this.usersService.findOneByMail(mail);
    if (!existUser) throw new ForbiddenException();

    const match = await bcrypt.compare(pass, existUser.pass);
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
