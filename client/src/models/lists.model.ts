
export interface ListItemI {
    checked: boolean,
    value: string
}

export interface CheckListConfigI {
    elements: ListItemI[];
    onClick: Function
}

export interface FilterListConfigI extends CheckListConfigI {
    hasDropdown: boolean;
    hasSearch: boolean;
}

