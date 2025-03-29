import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockQueryI } from "src/stocks/models/query.model";
import { QueryDto } from "../db/query.dto";
import { QueryDocument, Query } from "../db/query.schema";


@Injectable()
export class QueryService {

    constructor(@InjectModel(Query.name) private queryModel: Model<QueryDocument>){}

    async createQuery(query: QueryDto): Promise<StockQueryI> {
          const createdQuery = await new this.queryModel(query);
          return createdQuery.save();
    }

   async getAllQueriesForUser(email: string): Promise<StockQueryI[]> {
        try {
            const queries = await this.queryModel.find({user_email: email});
            return queries;
        }
        catch(e) {
            return null;
        }
   }

}