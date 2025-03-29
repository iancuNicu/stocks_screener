import { Body, Controller, Post, Request, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/user/db/user.dto';
import { UserService } from 'src/user/services/user.service';
import { AccessTokenI, AuthResponseI } from '../auth.model';
import { JwtAuthGuard } from '../passport/guards/jwt-guard';
import { JwtRefreshGuard } from '../passport/guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../passport/guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private userService: UserService){}

    @UseGuards(LocalAuthGuard)            
    @Post('login')
    async login(@Request() req): Promise<AuthResponseI> {
        try {
          const jwtTokens = await this.authService.generateTokens(req.user);
          return {user: req.user, access_token: jwtTokens.access_token, refresh_token: jwtTokens.refresh_token};
        }
        catch (e) {
          throw e;
        }
    }

    @Post('signup')
    async signup(@Body() userDto: CreateUserDto): Promise<AuthResponseI> {
        try {
          const newUser = await this.userService.createUser(userDto);
          const jwtTokens = await this.authService.generateTokens(userDto);
          return {user: newUser, access_token: jwtTokens.access_token, refresh_token: jwtTokens.refresh_token};
        }
        catch (e) {
          throw e
        }
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async getNewAuthToken(@Body() body): Promise<AccessTokenI> {
      const {access_token, refresh_token} = await this.authService.generateTokens(body.user);
      return {access_token, refresh_token};
    }

    @UseGuards(JwtRefreshGuard)
    @Post('token')
    checkToken(@Req() req): Promise<any> {
      const verify = this.authService.verifyToken(req.headers["authorization"].replace('Bearer', '').trim());
      return verify;
    }
    
    
}
