import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../../axios.config';
import { USER_ACTION_TYPES } from "../actions/user.actions";
import { setError } from "../slices/app.slice";

import { addUser } from '../slices/user.slice';

export default function* watchUserSaga() {
    yield takeLatest(USER_ACTION_TYPES.GET_USER, getUserSaga);
}

let getUserDetails = async () => {
    return await axios.get('user');
}

export function* getUserSaga({payload}: any): any {
    try {
        //TODO send user id or email to get user details
        let userDetails = yield call(() => getUserDetails());
        yield put(addUser(userDetails.data));
    }
    catch (e: any) {
        yield put(setError({error: e.message}))
    }
}
