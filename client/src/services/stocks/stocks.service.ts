import axios from '../../axios.config';
import { StockProfileI } from '../../models/stocks.model';

export const StocksService = {

    getCompanyProfile(symbol: string, auth_token: string): Promise<{data: [StockProfileI]}> {
        const config = {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${auth_token}`
            }
        }
        return axios.get(`stocks/profile?symbol=${symbol}`, config);
    }

}