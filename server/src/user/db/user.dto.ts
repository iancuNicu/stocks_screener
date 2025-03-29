import { IsNotEmpty, IsString, MaxLength, IsEmail, IsObject } from "class-validator";
import { StockQueryI } from "src/stocks/models/query.model";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly password: string

    @IsObject()
    readonly defaultQuery: StockQueryI

}
