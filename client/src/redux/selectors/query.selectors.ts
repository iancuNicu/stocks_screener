import { createSelector } from 'reselect';

const selectQuery = state => state.query;

export const selectCurrentQuery = createSelector(
    selectQuery,
    (querySlice) => querySlice.currentQuery
);

export const selectDefaultQuery = createSelector(
    selectQuery,
    (querySlice) => querySlice.defaultQuery
)

export const selectSavedQueries = createSelector(
    selectQuery,
    (querySlice) => querySlice.savedQueries
)

export const selectQueryOffsetAndLimit = createSelector(
    selectQuery,
    (querySlice) => ({
        offset: querySlice.offset,
        limit: querySlice.limit
    })
)