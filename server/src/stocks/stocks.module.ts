import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksController } from './controller/stocks.controller';
import { StockSchema } from './db/stocks.schema';
import { StocksService } from './services/stocks.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{
            name: 'Stock',
            schema: StockSchema
        }])    
    ],
    controllers: [StocksController],
    providers: [StocksService],
    exports: [StocksService]
})
export class StocksModule {}