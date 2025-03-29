
export enum ColumnElementType {
    IMAGE = "IMAGE",
    TEXT = "TEXT"
}

export interface UrlParamI {
    isQueryParam: boolean,
    paramName: string
}

export interface ColumnElementI {
    type: ColumnElementType,
    key: string
}

export interface ColumnConfigI {
    description: string,
    elements: ColumnElementI[]
}

export interface TableConfigI {
    size?: string,
    variant?: string,
    withFiltersBtn: boolean,
    navigation?: {
        url: string,
        parameters: UrlParamI[]
    },
    fixedColumns: ColumnConfigI[],
    columns: ColumnConfigI[],
}