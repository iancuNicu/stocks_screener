import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from "rxjs";
import { Stock, StocksDocument } from "../db/stocks.schema";
import { StockQueryI } from "../models/query.model";
import { ScreenerStockI, StockModelI } from "../models/stocks.models";

@Injectable()
export class StocksService {

    constructor(@InjectModel(Stock.name) private stockModel: Model<StocksDocument>,
                private httpService: HttpService){}

    async getStockScreenerList(stockListQuery: StockQueryI): Promise<ScreenerStockI[]> {
        const {limit, offset} = stockListQuery;
        const maxLimit = limit * offset;
        const queryString = Object.keys(stockListQuery).filter(key => key !== 'limit' && key !== 'offset')
                                  .map(key => `${key}=${stockListQuery[key]}&`)
                                  .reduce((acc, currVal) => {
                                    return acc + currVal
                                  }, '');               
        const stockList =  await lastValueFrom(
            this.httpService
            .get(`${process.env.API_BASE_PATH}stock-screener?${queryString}limit=${maxLimit}&apikey=${process.env.API_KEY}`)
        );
        return stockList.data.slice((limit*(offset-1)), maxLimit+1);
    }

    async getStocksFromDB(stocksSymbolArr: string[]): Promise<StockModelI[]> {
        const dbStocks = await this.stockModel.find({ symbol: stocksSymbolArr});
        const notInDBSymbols = stocksSymbolArr.filter(symbol => !dbStocks.find(stock => stock.symbol === symbol));
        try {
            const notInDbStocks = await Promise.all(
                notInDBSymbols.map(symbol => this.getStockOutlook(symbol))
            );
           const stocks = notInDbStocks.map(stock => {
            return {
                symbol: stock.data.profile.symbol,
                ...stock.data
               }
           });
           this.stockModel.insertMany(stocks);
           return [...stocks, ...dbStocks]
        }
        catch (e) {
            throw e;
        }
    }

    getCompanyProfile(symbol: string): Promise<any> {
        return lastValueFrom(
            this.httpService.get(`${process.env.API_BASE_PATH}profile/${symbol}?apikey=${process.env.API_KEY}`)
        );
    }

    private getStockOutlook(symbol: string): Promise<any> {
        return lastValueFrom(
            this.httpService.get(`${process.env.API_V4_PATH}company-outlook?symbol=${symbol}&apikey=${process.env.API_KEY}`)
        )
    }

}