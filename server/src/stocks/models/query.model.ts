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
    user_email: string;
    name: string;
    marketCapMoreThan?: number,
    marketCapLowerThan?: number,
    priceMoreThan?: number,
    priceLowerThan?: number,
    volumeMoreThan?: number,
    volumeLowerThan?: number,
    dividendMoreThan?: number,
    dividendLowerThan?: number,
    isEtf?: boolean,
    betaMoreThan?: number,
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