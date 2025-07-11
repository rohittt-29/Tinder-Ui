import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed:(state , action)=>{  
            return action.payload
        },
        removeUserfromFeed:(state, action)=> {
const newFeed = state.filter((user)=> user._id !== action.payload);
return newFeed
        }
    },
});

export const {addFeed , removeUserfromFeed} =feedSlice.actions;
export default feedSlice.reducer;