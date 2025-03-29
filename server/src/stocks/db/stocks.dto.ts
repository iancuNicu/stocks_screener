import { IsArray, IsNotEmpty, IsObject, IsString, MaxLength } from "class-validator"


export class StocksDto {
    
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly symbol: string

    @IsObject()
    @IsNotEmpty()
    readonly profile: {[key: string]: string | number}

    @IsObject()
    @IsNotEmpty()
    readonly metrics: {[key: string]: string | number}

    @IsArray()
    @IsNotEmpty()
    readonly ratios: {[key: string]: string | number}

    @IsArray()
    @IsNotEmpty()
    readonly insideTrades: {[key: string]: string | number}

    @IsArray()
    @IsNotEmpty()
    readonly stockNews: {[key: string]: string | number}

    @IsObject()
    @IsNotEmpty()
    readonly financialsAnnual: {
        income: [ {[key: string]: string | number} ],
        balance: [ {[key: string]: string | number} ],
        cash: [ {[key: string]: string | number} ]
    }

    @IsObject()
    @IsNotEmpty()
    readonly financialsQuarter: {
        income: [ {[key: string]: string | number} ],
        balance: [ {[key: string]: string | number} ],
        cash: [ {[key: string]: string | number} ]
    }

}