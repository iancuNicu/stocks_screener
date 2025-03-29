import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/passport/guards/jwt-guard";
import { StockQueryI } from "src/stocks/models/query.model";
import { QueryService } from "../services/query.service";


@Controller('query')
export class QueryController {

    constructor(private queryService: QueryService){}

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getStocksList(@Body() body): Promise<StockQueryI[]> {
        try {
            const queries = await this.queryService.getAllQueriesForUser(body.email);
            return queries;
        }
        catch(e) {
            throw e;
        }
    }

}