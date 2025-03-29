import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenI } from '../auth.model';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
    
    constructor(private jwtService: JwtService){}

    async generateTokens(user): Promise<AccessTokenI> {
        return {
            access_token: this.jwtService.sign({_id: user._id.toString(), username: user.email}, {secret: process.env.JWT_SALT, expiresIn: '15m'}),
            refresh_token: this.jwtService.sign({_id: user._id.toString()}, {secret: process.env.JWT_REFRESH_SALT, expiresIn: '7d'})
        }
    }

    async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token, {secret: process.env.JWT_SALT});
    }

}
