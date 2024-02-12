import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        userInfo:{}
    },
    reducers:{
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export default authSlice.reducer