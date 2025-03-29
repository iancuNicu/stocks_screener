import { all } from 'redux-saga/effects';

import userSaga from './user.saga';
import stockSearchSaga from './stocks.saga';

function* rootSaga() {
    yield all([userSaga(), stockSearchSaga()]);
}

export default rootSaga;