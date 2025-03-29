import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from "../db/user.dto";
import { User, UserDocument } from '../db/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(userDto: CreateUserDto): Promise<User> {
          const createUser = await new this.userModel(userDto);
          return createUser.save();
    }

   async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({email});
            return user;
        }
        catch(e) {
            return null;
        }
   }

}