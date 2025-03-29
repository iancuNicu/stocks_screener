import { StockQueryI } from "../../models/stocks.model";

export enum STOCK_ACTION_TYPES {
    GET_SEARCH_PROFILES = "GET_SEARCH_PROFILES",
    GET_FINANCIALS = "GET_FINANCIALS"
}

export const getCompanySearchProfiles = (auth_token: string, query: string) => ({
    type: STOCK_ACTION_TYPES.GET_SEARCH_PROFILES,
    payload: {
        token: auth_token,
        query
    }
});

export const getStockProfilesList = (auth_token: string, offset: number, limit: number, query: StockQueryI) => ({
    type: STOCK_ACTION_TYPES.GET_FINANCIALS,
    payload: {
        token: auth_token,
        offset,
        limit,
        query
    }
});