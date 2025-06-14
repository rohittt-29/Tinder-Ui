import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import RequestReducer from "./requestSlice";

const appStore = configureStore({
        reducer:{
            user: userReducer,
            feed: feedReducer,
            connection: connectionReducer,
            request: RequestReducer,
        },
});

export default appStore;