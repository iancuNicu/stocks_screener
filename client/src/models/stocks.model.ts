export enum StockSectorEnum {
    CC = "Consumer Cyclical",
    Energy = "Energy",
    Technology = "Technology",
    Industrials = "Industrials",
    FS = "Financial Services",
    BM = "Basic Materials",
    CS = "Communication Services",
    CD = "Consumer Defensive",
    Healthcare = "Healthcare",
    RE = "Real Estate",
    Utilities = "Utilities",
    IG = "Industrial Goods",
    Financial = "Financial",
    Services = "Services",
    Conglomerates = "Conglomerates"
}

export enum StockIndustryEnum {
    Autos = "Autos",
    Banks = "Banks",
    BD = "Banks Diversified",
    Software = "Software",
    BR = "Banks Regional",
    BA = "Beverages Alcoholic",
    Beverages = "Beverages",
    Brewers = "Brewers",
    BNA = "Beverages Non-Alcoholic"
}

export interface StockQueryI {
    _id?: string,
    user_email: string,
    marketCapMoreThan?: number,
    marketCapLowerThan?: number,
    priceMoreThan?: number,
    priceLowerThan?: number,
    volumeMoreThan?: number,
    volumeLowerThan?: number,
    dividendMoreThan?: number,
    dividendLowerThan?: number,
    betaMoreThan?: number,
    isEtf?: boolean,
    isActivelyTrading?: boolean,
    sector?: StockSectorEnum,
    Industry?: StockIndustryEnum,
    Country?: string,
    exchange?: string,
    limit?: number,
    offset?: number,
    peRatioTTM?: number,
    cashRatioTTM?: number,
    netProfitMarginTTM?: number,
    cashFlowToDebtRatioTTM?: number
}

export interface StockProfileI {
    symbol: string,
    companyName: string,
    marketCap: number,
    sector: string,
    industry: string,
    beta: number,
    price: number,
    lastAnnualDividend: number,
    volume: number,
    exchange: string,
    exchangeShortName: string,
    country: string,
    isEtf: boolean,
    isActivelyTrading: boolean
}