import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';
import { StockIndustryEnum, StockSectorEnum } from "src/stocks/models/query.model";

export type QueryDocument = HydratedDocument<Query>;

@Schema()
export class Query {

    @Prop({required: true})
    user_email: string;

    @Prop({required: true})
    name: string;

    @Prop({required: false})
    marketCapMoreThan: number;

    @Prop({required: false})
    marketCapLowerThan: number;

    @Prop({required: false})
    priceMoreThan: number;

    @Prop({required: false})
    priceLowerThan: number;

    @Prop({required: false})
    volumeMoreThan: number;

    @Prop({required: false})
    volumeLowerThan: number;

    @Prop({required: false})
    dividendMoreThan: number;

    @Prop({required: false})
    dividendLowerThan: number;

    @Prop({required: false})
    isEtf?: boolean;

    @Prop({required: false})
    betaMoreThan: number;

    @Prop({required: false})
    isActivelyTrading: boolean;

    @Prop({required: false})
    sector: StockSectorEnum;

    @Prop({required: false})
    Industry: StockIndustryEnum;

    @Prop({required: false})
    Country: string;

    @Prop({required: false})
    exchange: string;

    @Prop({required: false})
    limit: number;

    @Prop({required: false})
    offset: number;

    @Prop({required: false})
    peRatioTTM: number;

    @Prop({required: false})
    cashRatioTTM: number;

    @Prop({required: false})
    netProfitMarginTTM: number;

    @Prop({required: false})
    cashFlowToDebtRatioTTM: number;  

}

export const QuerykSchema = SchemaFactory.createForClass(Query);