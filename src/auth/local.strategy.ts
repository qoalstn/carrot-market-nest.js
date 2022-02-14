import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      usernameField: 'mail', // validate 함수의 인자는 기본적으로 req.body.username 과 password이다.
      passwordField: 'pass', // 다른 이름으로 받으려면 super에서 설정이 필요하다.
    });
  }

  async validate(mail: string, pass: string): Promise<any> {
    const user = await this.authService.validateUser(mail, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
