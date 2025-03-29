import {
    createSlice
  } from "@reduxjs/toolkit";

  const initialState: {
    companySearchProfiles: any[],
    companyProfiles: any[],
  } = {
    companySearchProfiles: [],
    companyProfiles: [],
  }

  const stocksSlice = createSlice({
    name: "stocks",
    initialState,
    reducers: {
      addCompanySearchProfile: (state, action) => {
        return {
          ...state,
          companySearchProfiles: [...action.payload.profiles]
        }
      },
      addCompanyProfiles: (state, action) => {
        return {
          ...state,
          companyProfiles: [...state.companyProfiles, ...action.payload.companyProfiles]
        }
      }
    }
  });

  export const { addCompanySearchProfile, addCompanyProfiles  } = stocksSlice.actions;

  export default stocksSlice.reducer;
