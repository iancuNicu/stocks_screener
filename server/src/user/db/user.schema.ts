import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt'; 
import { StockQueryI } from "src/stocks/models/query.model";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

   @Prop({unique: true, required: true})
   email: string;

   @Prop({required: true})
   password: string;

   @Prop({required: false, type: Object})
   defaultQuery: StockQueryI

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function(next) {
   const user = this;

   // hash password only if it has changed or is signup
   if(!user.isModified("password")){
      return next();
   }

   // hash the password using the salt
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (e, hash) => {
          user.password = hash;
          next();
      });
   });

});