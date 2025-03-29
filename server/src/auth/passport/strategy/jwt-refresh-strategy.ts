import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh-token') {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req)=> {
          const refresh_token = req.body.refresh_token;
          return refresh_token;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SALT,
    });
  }

  async validate(payload: any) {
   return payload;
  }
  
}