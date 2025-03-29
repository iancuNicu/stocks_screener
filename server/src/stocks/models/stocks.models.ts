
export interface StockOutlookModelI {
    profile: {[key: string]: string | number},
    metrics:  {[key: string]: string | number},
    ratios: [ {[key: string]: string | number} ],
    insideTrades: [ {[key: string]: string | number} ],
    stockNews: [ {[key: string]: string | number} ],
    financialsAnnual: {
        income: [ {[key: string]: string | number} ],
        balance: [ {[key: string]: string | number} ],
        cash: [ {[key: string]: string | number} ]
    },
    financialsQuarter: {
        income: [ {[key: string]: string | number} ],
        balance: [ {[key: string]: string | number} ],
        cash: [ {[key: string]: string | number} ]
    }
}

export interface StockModelI extends StockOutlookModelI {
    symbol: string
}

export interface ScreenerStockI {
    symbol: string,
    companyName: string,
    image?: string,
    marketCap: number,
    sector: string,
    beta: number,
    price: number,
    lastAnnualDividend: number,
    volume: number,
    exchange: string,
    exchangeShortName: string
}