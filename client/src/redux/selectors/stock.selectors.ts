import { createSelector } from 'reselect';

const selectStocks = state => state.stocks;

export const selectCompanySearchProfiles = createSelector(
    selectStocks,
    (stocksSlice) => stocksSlice.companySearchProfiles
)

// map the profiles to be used more properly for table
// need to flatten profile, metrics and ratios data
//so that the table maps the column keys to the data better
export const selectCompanyProfilesForTable = createSelector(
    selectStocks,
    (stocksSlice) => stocksSlice.companyProfiles.map(profile => ({
        ...profile.profile,
        ...profile.metrics,
        ...profile.ratios[0]
    }))
);
