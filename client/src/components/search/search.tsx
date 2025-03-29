import { useEffect, useState } from 'react';
import { Form, FormControl, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import { getCompanySearchProfiles } from '../../redux/actions/stocks.actions';
import { selectCompanySearchProfiles } from '../../redux/selectors/stock.selectors';
import './search.scss';
import { CustomTable } from '../table/table';
import { ColumnElementType, TableConfigI } from '../../models/table.model';
import { selectDefaultQuery } from '../../redux/selectors/query.selectors';
import { StocksService } from '../../services/stocks/stocks.service';
import { StockProfileI } from '../../models/stocks.model';
import { setError } from '../../redux/slices/app.slice';

const tableConfig: TableConfigI = {
    size: "sm",
    withFiltersBtn: false,
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
                // {
                //    type: ColumnElementType.IMAGE,
                //    key: "image" 
                // }, 
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
        },
        {
            description: "Price",
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
        }
    ],
    columns: []
}

export function Search() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [isReqMade, setIsReqMade] = useState(false);
    const [searchedProfile, setSearchProfile] = useState<StockProfileI | null>(null);
    
    const [token, setCookie, removeCookie] = useCookies(['auth_token']);

    const companyProfiles = useSelector(selectCompanySearchProfiles);

    const defaultQuery = useSelector(selectDefaultQuery);

    const dispatch = useDispatch();

    useEffect(() => {
       if(!companyProfiles?.length && !isReqMade){
        dispatch(getCompanySearchProfiles(token.auth_token, defaultQuery));
        setIsReqMade(true);
       }
    })

    const modalClose = (ev: any) => {
        setModalOpen(false);   
    }

    const onModalOpen = (ev:any) => {
        if(!isModalOpen){
            setModalOpen(true);
        }
    }

    const onSearch = async (val: string) => {
        try {
            const stockProfile = await StocksService.getCompanyProfile(val, token.auth_token);
            if(stockProfile?.data) {
                setSearchProfile(stockProfile.data[0]);
            }
        }
        catch(e: any) {
            setError(e.message)
        }
    }

    return (
        <>
            <SearchInput onSearch={onSearch} modalClose={modalClose} onModalOpen={onModalOpen} />
            <Modal autoFocus={false}
                   show={isModalOpen}
                   scrollable={true}
                   backdrop={false}>
                <Modal.Body>
                    {
                       <CustomTable tableConfig={tableConfig} 
                                    data={searchedProfile ? [searchedProfile] : companyProfiles} />
                    }
                </Modal.Body>
            </Modal>
        </>
    );

}

function SearchInput({onSearch, modalClose, onModalOpen}:{onSearch:any, modalClose:any, onModalOpen:any}) {

    const [searchTerm, setSearch] = useState("");

    const onSearchChange = (ev: any) => {
        setSearch(ev.target.value);
        onSearch(ev.target.value);
    }
    
    return (
        <Form className='d-flex'>
                <FormControl type="search" placeholder='Search'
                    className='search-input'
                    onBlur={modalClose}
                    onClick={onModalOpen}
                    value={searchTerm} onChange={onSearchChange}>
                </FormControl> 
        </Form>
    )

}