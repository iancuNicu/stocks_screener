import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,
              private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if(!user){
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }
    const match = await this.authService.comparePassword(password, user.password);
    if (!match && !user) {
        throw new UnauthorizedException();
    }
    return user;
  }

}