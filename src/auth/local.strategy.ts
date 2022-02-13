import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(mail: string, pass: string): Promise<any> {
    console.log(1);

    console.log(mail, pass);

    const user = await this.authService.validateUser(mail, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
