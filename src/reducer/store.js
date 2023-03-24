import {configureStore} from '@reduxjs/toolkit';
import appSlice from "./appSlice";
import {fetchComments, fetchPosts, fetchUsers} from "../utils/thunkFetch";


const store = configureStore({
    reducer: {
        app: appSlice,
    },
});

// Fetch data and dispatch actions when the store is initialized
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
store.dispatch(fetchComments());

export default store;