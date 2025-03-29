import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import userReducer from './slices/user.slice';
import appReducer from './slices/app.slice';
import stocksReducer from './slices/stocks.slice';
import queryReducer from './slices/query.slice';

import rootSaga from './sagas/root.saga';

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: {
      stocks: stocksReducer,
      user: userReducer,
      query: queryReducer,
      app: appReducer
    },
    middleware
  });

  sagaMiddleware.run(rootSaga);

  export default store;