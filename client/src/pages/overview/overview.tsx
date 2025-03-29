import "./overview.scss";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../../components/table/table";
import { ColumnElementType, TableConfigI } from "../../models/table.model";
import { getUserDefaultQuery } from "../../redux/actions/query.actions";
import { getStockProfilesList } from "../../redux/actions/stocks.actions";
import { selectCurrentQuery, selectDefaultQuery, selectQueryOffsetAndLimit } from "../../redux/selectors/query.selectors";
import { selectCompanyProfilesForTable } from "../../redux/selectors/stock.selectors";
import { selectUserEmail } from "../../redux/selectors/user.selectors";
import { changeOffset } from "../../redux/slices/query.slice";


const tableConfig: TableConfigI = {
    size: "lg",
    variant: "light",
    withFiltersBtn: true,
    navigation: {
        url: 'overview',
        parameters: [{
            isQueryParam: false,
            paramName: "symbol"
        }]
    },
    fixedColumns: [
        {
            description: "Symbol",
            elements : [
                {
                   type: ColumnElementType.IMAGE,
                   key: "image" 
                }, 
                {
                    type: ColumnElementType.TEXT,
                    key: "symbol"
                }
            ] 
        },
        {
            description: "Name",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "companyName"
                }
            ]
        }
    ],
    columns: [
        {
            description: "Price & Currency",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "price"
                },
                {
                    type: ColumnElementType.TEXT,
                    key: "currency"
                }
            ]
        },
        {
            description: "PE Ratio",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "priceEarningsRatioTTM"
                }
            ]
        },
        {
            description: "Volume",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "volume"
                }
            ]
        },
        {
            description: "Quick ratio",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "quickRatioTTM"
                }
            ]
        },
        {
            description: "Cashflow to Debt",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "cashFlowToDebtRatioTTM"
                }
            ]
        },
        {
            description: "Dividend Yield Percentage",
            elements: [
                {
                    type: ColumnElementType.TEXT,
                    key: "dividendYielPercentageTTM"
                }
            ]
        }
    ]
}

export const Overview = () => {

    const dispatch = useDispatch();

    const companyFinancials = useSelector(selectCompanyProfilesForTable);

    const {offset, limit} = useSelector(selectQueryOffsetAndLimit);

    const currentQuery = useSelector(selectCurrentQuery);

    const defaultQuery = useSelector(selectDefaultQuery);

    const email = useSelector(selectUserEmail)

    const [token, setCookie, removeCookie] = useCookies(['auth_token']);

    useEffect(() => {
        if(!currentQuery){
            dispatch(getUserDefaultQuery(token.auth_token, email))
        }
        if(!companyFinancials.length && (currentQuery || defaultQuery)){
            const query = currentQuery ? currentQuery : defaultQuery;
            dispatch(getStockProfilesList(token.auth_token, offset, limit, query));
        }
    }, []);

    const onScroll = (ev: any) => {
        const bottom = ev.target.scrollHeight - ev.target.scrollTop === ev.target.clientHeight;
        if(bottom){
            dispatch(changeOffset());
            const query = currentQuery ? currentQuery : defaultQuery;
            dispatch(getStockProfilesList(token.auth_token, offset, limit, query));
        }
    }

    return (
        <div className="overview-container container-fluid" onScroll={onScroll}>
            <CustomTable tableConfig={tableConfig} data={companyFinancials} />
        </div>
    );

}