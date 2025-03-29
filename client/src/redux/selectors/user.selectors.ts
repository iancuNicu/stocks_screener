import { createSelector } from 'reselect';

const selectUser = state => state.user

export const selectUserEmail = createSelector(
    selectUser,
    (userSlice) => userSlice.email
);