import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QueryController } from "./controller/query.controller";
import { QuerykSchema } from "./db/query.schema";
import { QueryService } from "./services/query.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Query',
            schema: QuerykSchema
        }])    
    ],
    controllers: [QueryController],
    providers: [QueryService],
    exports: [QueryService]
})
export class QueryModule {}