import {createSlice} from '@reduxjs/toolkit';
import {fetchComments, fetchPosts, fetchUsers} from '../utils/thunkFetch';
import {getRandomArbitrary} from "../utils/utils";
import * as Types from "./Types";

export const controlLikesAndDislikes = (state, action) => {

    switch (action) {
        case Types.LIKE_INCREASE:
            return {
                type: Types.LIKE_INCREASE,
                state: {
                    ...state,
                    likes: state.likes + 1,
                }
            }
        case Types.LIKE_DECREASE:
            return {
                type: Types.LIKE_DECREASE,
                state: {
                    ...state,
                    likes: state.likes - 1,
                }
            }
        case Types.DISLIKE_INCREASE:
            return {
                type: Types.DISLIKE_INCREASE,
                state: {
                    ...state,
                    dislikes: state.dislikes + 1,
                }
            }
        case Types.DISLIKE_DECREASE:
            return {
                type: Types.DISLIKE_DECREASE,
                state: {
                    ...state,
                    dislikes: state.dislikes - 1,
                }
            }
        default:
            return state;
    }
};


const appSlice = createSlice({
    name: 'app',
    initialState: {
        posts: [],
        users: [],
        comments: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        controlLikesAndDislikes
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchPosts action
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.map((post) => ({
                    ...post,
                    likes: getRandomArbitrary(1, 20),
                    dislikes: getRandomArbitrary(1, 20),
                }));
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle fetchUsers action
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle fetchComments action
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default appSlice.reducer;