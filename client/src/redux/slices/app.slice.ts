import {
    createSlice
  } from "@reduxjs/toolkit";

  const initialState = {
    error: null,
    loading: false
  }

  const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setError: (state, action) => {
         return {
            ...state,
            error: action.payload.error
         }
        },
        removeError: (state, action) => {
             return {
                ...state,
                error: null
             }
        },
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        } 
     }
  });

  export const { setError, removeError, setLoading } = appSlice.actions;

  export default appSlice.reducer;