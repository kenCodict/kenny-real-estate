import { createSlice } from '@reduxjs/toolkit'

const initialState = {
currentUser:null,
error:null,
loading:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sigInState: (state) => {
        state.loading = true
    },
    signInSuccess: (state, action) => {
        state.currentUser = action.payload
        state.loading = false
        state.error = null
    },
    signInFailure: (state, action) => {
        // state.currentUser = action.payload
        state.loading = false
        state.error = action.payload
    },
    updateUserStart: (state) => {
      state.loading = true
  },
    updateUserSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
  },
 UpdateFailure: (state, action) => {
    // state.currentUser = action.payload
    state.loading = false
    state.error = action.payload
},
deleteUserSuccess: (state) => {
      state.loading = false
      state.currentUser = null
      state.error = null
  },
  deleteFailure: (state, action) => {
    // state.currentUser = action.payload
    state.loading = false
    state.error = action.payload
},
  },
})

// Action creators are generated for each case reducer function
export const {sigInState ,signInSuccess ,signInFailure, updateUserStart,updateUserSuccess ,UpdateFailure,deleteUserSuccess,deleteFailure} = userSlice.actions

export default userSlice.reducer