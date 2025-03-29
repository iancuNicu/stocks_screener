import {
    createSlice
  } from "@reduxjs/toolkit";

  const initialState = {
    email: null,
    password: null
  }

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       addUser: (state, action) => {
        return {
            ...action.payload
        }
       },
       removeUser: (state, action) => {
            return {
                ...initialState
            }
       } 
    }
  });

  export const { addUser, removeUser } = userSlice.actions;

  export default userSlice.reducer;