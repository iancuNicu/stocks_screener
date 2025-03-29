import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { StockIndustryEnum, StockSectorEnum } from "src/stocks/models/query.model";


export class QueryDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    user_email: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNumber()
    @IsOptional()
    marketCapMoreThan: number;

    @IsNumber()
    @IsOptional()
    marketCapLowerThan: number;

    @IsNumber()
    @IsOptional()
    priceMoreThan: number;

    @IsNumber()
    @IsOptional()
    priceLowerThan: number;

    @IsNumber()
    @IsOptional()
    volumeMoreThan: number;

    @IsNumber()
    @IsOptional()
    volumeLowerThan: number;

    @IsNumber()
    @IsOptional()
    dividendMoreThan: number;

    @IsNumber()
    @IsOptional()
    dividendLowerThan: number;

    @IsBoolean()
    @IsOptional()
    isEtf: boolean;

    @IsNumber()
    @IsOptional()
    betaMoreThan: number;

    @IsBoolean()
    @IsOptional()
    isActivelyTrading: boolean;

    @IsEnum(StockSectorEnum)
    @IsOptional()
    sector: StockSectorEnum;

    @IsEnum(StockIndustryEnum)
    @IsOptional()
    Industry: StockIndustryEnum;

    @IsString()
    @IsOptional()
    Country: string;

    @IsString()
    @IsOptional()
    exchange: string;

    @IsNumber()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsOptional()
    offset: number;

    @IsNumber()
    @IsOptional()
    peRatioTTM: number;

    @IsNumber()
    @IsOptional()
    cashRatioTTM: number;

    @IsNumber()
    @IsOptional()
    netProfitMarginTTM: number;

    @IsNumber()
    @IsOptional()
    cashFlowToDebtRatioTTM: number;

}