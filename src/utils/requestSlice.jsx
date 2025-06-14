import { createSlice } from "@reduxjs/toolkit";
import reducer from "./connectionSlice";

const requestSlice = createSlice({
    name: "request",
    initialState:null,
    reducers:{
        addRequest: (state, action )=>action.payload,
        removeRequest: ()=>null,
    },

});
 export const {addRequest} = requestSlice.actions;
 export default requestSlice.reducer;