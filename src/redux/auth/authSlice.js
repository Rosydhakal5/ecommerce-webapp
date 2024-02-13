import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
}

const authSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { setUserInfo } = authSlice.actions

export default authSlice.reducer
