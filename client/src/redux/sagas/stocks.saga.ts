import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../../axios.config';
import { STOCK_ACTION_TYPES } from '../actions/stocks.actions';
import { setError } from "../slices/app.slice";
import { addCompanySearchProfile, addCompanyProfiles } from "../slices/stocks.slice";
import { changeOffset } from '../slices/query.slice';

const config = {
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": ''
    }
}

export default function* watchStockSearchSaga(){
    yield takeLatest(STOCK_ACTION_TYPES.GET_SEARCH_PROFILES, getStockSearchSaga);
    yield takeLatest(STOCK_ACTION_TYPES.GET_FINANCIALS, getStockProfileSaga);
}

let getStockListCompanyData = async (auth_token: string, offset: number, limit: number, userQuery: any) => {
    config.headers["Authorization"] = `Bearer ${auth_token}`;
    const query = Object.keys(userQuery).filter(key => key !== 'user_email' && key !== '_id')
                                        .map(key => `&${key}=${userQuery[key]}`)    
                                        .reduce((acc, val) => acc+val, '')
    return axios.get(`/stocks/list?limit=${limit}${query}&offset=${offset}`, config);
}

let getStockSearchCompanies = async (auth_token: string, defaultQuery: any) => {
    config.headers["Authorization"] = `Bearer ${auth_token}`;
    const query = Object.keys(defaultQuery).filter(key => key !== 'user_email' && key !== '_id')
                                        .map(key => `&${key}=${defaultQuery[key]}`)    
                                        .reduce((acc, val) => acc+val, '')
    return await axios.get(`/stocks/search-list?${query}`, config);
}

export function* getStockProfileSaga({payload}: any): any {
    try {
        let companyProfiles = yield call(() => getStockListCompanyData(payload.token, payload.offset, payload.limit, payload.query));
        yield put(addCompanyProfiles({companyProfiles: companyProfiles.data}));
        yield put(changeOffset())
    }
    catch(e: any) {
        yield put(setError({error: e.message}))
    }
} 

export function* getStockSearchSaga({payload}: any): any {
    try {
        let companyProfiles = yield call(() => getStockSearchCompanies(payload.token, payload.query));
        yield put(addCompanySearchProfile({profiles: companyProfiles.data}));
    }
    catch (e: any) {
        yield put(setError({error: e.message}))
    }
}


