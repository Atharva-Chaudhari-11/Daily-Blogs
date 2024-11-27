import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status   : false,
    userData : null
}
// it contsins the all actions in authSlice
//in this way we can create a functionlity for POST in this blog website
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true
            state.userData=action.payload.userData
            
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
        }
    }
})
// remember this authslice.actions and authslice.reducer
export const {login, logout} = authSlice.actions;

export default authSlice.reducer;