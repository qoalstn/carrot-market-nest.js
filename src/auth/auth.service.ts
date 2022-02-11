import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: number, password: string): Promise<any> {
    const user = await this.usersService.findOneById(userId);
    if (user[0] && user[0].pass === password) {
      const { pass, ...result } = user[0];
      return result;
    }
    return null;
  }

  async login(user: any): Promise<object> {
    const payload = { id: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
