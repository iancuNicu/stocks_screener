import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/passport/guards/jwt-guard";
import { StockQueryI } from "../models/query.model";
import { ScreenerStockI, StockModelI } from "../models/stocks.models";
import { StocksService } from "../services/stocks.service";

@Controller('stocks')
export class StocksController {

    constructor(private stockService: StocksService){}

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getStocksList(@Query() stocksQuery: StockQueryI): Promise<StockModelI[]> {
        try {
            const stocks = await this.stockService.getStockScreenerList(stocksQuery);
            return this.stockService.getStocksFromDB(stocks.map(stock => stock.symbol))
        }
        catch(e) {
            throw e;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('search-list')
    async getSearchList(@Query() stocksQuery: StockQueryI): Promise<ScreenerStockI[]> {
        stocksQuery.offset = 1;
        stocksQuery.limit = 30;
        try {
            const stocks = await this.stockService.getStockScreenerList(stocksQuery);
            return stocks;
        }
        catch(e) {
            throw e;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getCompanyProfile(@Query() query: any): Promise<ScreenerStockI> {
        try {
            const profileData = await this.stockService.getCompanyProfile(query.symbol);
            return profileData.data;
        }
        catch (e) {
            throw e;
        }
    }

}