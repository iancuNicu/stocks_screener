import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose';

export type StocksDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {

   @Prop({unique: true, required: true})
   symbol: string;

   @Prop({required: true, type: Object})
   profile: {[key: string]: string | number};

   @Prop({required: true, type: Object})
   metrics: {[key: string]: string | number};

   @Prop({required: true, type: Array})
   insideTrades: [{[key: string]: string | number}];

   @Prop({required: true, type: Array})
   ratios: [{[key: string]: string | number}];

   @Prop({required: true, type: Array})
   stockNews: [{[key: string]: string | number}];

   @Prop({required: true, type: Object})
   financialsAnnual: {
    income: [ {[key: string]: string | number} ],
    balance: [ {[key: string]: string | number} ],
    cash: [ {[key: string]: string | number} ]
   }

  @Prop({required: true, type: Object})
  financialsQuarter: {
   income: [ {[key: string]: string | number} ],
   balance: [ {[key: string]: string | number} ],
   cash: [ {[key: string]: string | number} ]
  }

}

export const StockSchema = SchemaFactory.createForClass(Stock);