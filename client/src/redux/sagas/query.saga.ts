import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../../axios.config';
import { QUERY_ACTION_TYPES } from "../actions/query.actions";
import { setError } from "../slices/app.slice";
import { addDefaultQuery, addQueries } from "../slices/query.slice";

const config = {
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": ''
    }
}

let getSavedQueries = async (auth_token: string, email: string) => {
    config.headers["Authorization"] = `Bearer ${auth_token}`;
    return axios.get(`/query/list`, {
        ...config,
        data: {
            email
        }
    });
}

let getDefaultQuery = async (auth_token: string, email: string) => {
    config.headers["Authorization"] = `Bearer ${auth_token}`;
    return axios.get(`/user/default-query`, {
        ...config,
        data: {
            email
        }
    });
}

export function* getDefaultQueryForUser({payload}: any): any {
    try {
        let query = yield call(() => getDefaultQuery(payload.token, payload.email));
        yield put(addDefaultQuery({query}));
    }
    catch(e: any) {
        yield put(setError({error: e.message}))
    }
}

export function* getQueriesForUser({payload}: any): any {
    try {
        let queries = yield call(() => getSavedQueries(payload.token, payload.email));
        yield put(addQueries({queries}));
    }
    catch(e: any) {
        yield put(setError({error: e.message}))
    }
} 

export default function* watchQuerySearchSaga(){
    yield takeLatest(QUERY_ACTION_TYPES.GET_QUERIES, getQueriesForUser);
    yield takeLatest(QUERY_ACTION_TYPES.GET_DEFAULT_QUERY, getDefaultQueryForUser)
}