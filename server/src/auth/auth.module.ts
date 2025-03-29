import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './passport/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/strategy/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { JwtRefreshStrategy } from './passport/strategy/jwt-refresh-strategy';

@Module({
    imports: [
             PassportModule,
             UserModule,
             JwtModule.register({})
            ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
