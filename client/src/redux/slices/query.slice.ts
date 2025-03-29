import {
    createSlice
} from "@reduxjs/toolkit";

import { StockQueryI, StockSectorEnum } from '../../models/stocks.model';

const defaultQuery = {
    user_email: '',
    marketCapMoreThan: 1000000000,
    betaMoreThan: 1,
    volumeMoreThan: 10000,
    dividendMoreThan: 0,
    sector: StockSectorEnum.Technology
};

const initialState: {
    offset: number,
    limit: number,
    defaultQuery: StockQueryI,
    currentQuery: StockQueryI | null | undefined,
    savedQueries: StockQueryI[]
} = {
    offset: 1,
    limit: 20,
    defaultQuery,
    currentQuery: null,
    savedQueries: []
}  

const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
      changeOffset: (state) => ({
        ...state,
        offset: state.offset + 1
      }),
      addQueries: (state, action) => ({
        ...state,
        savedQueries: action.payload.queries
      }),
      addSavedQuery: (state, action) => ({
        ...state,
        savedQueries: [...state.savedQueries.filter(query => query._id !== action.payload.query._id), action.payload.query]
      }),
      removeQuery: (state, action) => ({
        ...state,
        savedQueries: [...state.savedQueries.filter(query => query._id !== action.payload.query._id)]
      }),
      addDefaultQuery: (state, action) => ({
        ...state,
        currentQuery: action.payload.query
      })
    }
  });

  export const { changeOffset, addSavedQuery, removeQuery, addQueries, addDefaultQuery } = querySlice.actions;

  export default querySlice.reducer;