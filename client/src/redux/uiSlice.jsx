const { createSlice } = require("@reduxjs/toolkit");

const uiSlice = createSlice({
    name:"UI", 
    initialState:{
        isRegisterd:false , 

    } , 
    reducers:{
        registerSwitch:(state) =>{
            state.isRegisterd=!state.isRegisterd
        }
    }
})

export const {registerSwitch} =uiSlice.actions
export default uiSlice.reducer