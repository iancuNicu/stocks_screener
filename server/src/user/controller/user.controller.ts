import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-guard';
import { StockQueryI } from 'src/stocks/models/query.model';
import { CreateUserDto } from '../db/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    // @UseGuards(JwtAuthGuard)
    // @Post()
    // async updateProfile(): Promise<User> {
    //  
    // }

    @UseGuards(JwtAuthGuard)
    @Get('default-query')
    async getUserDefaultQuery(@Body() body): Promise<StockQueryI> {
        try {
           const user = await this.userService.findUserByEmail(body.email);
           return !!user.defaultQuery ? user.defaultQuery : null;
        }
        catch(e) {
            throw e;
        }
    }

}