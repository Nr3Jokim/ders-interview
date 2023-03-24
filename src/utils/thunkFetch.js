import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'app/fetchPosts',
    async (_, { getState, forceRefetch = true }) => {
        const { posts } = getState().app;
        if (!forceRefetch && posts.length > 0) {
            return posts;
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    }
);

export const fetchUsers = createAsyncThunk(
    'app/fetchUsers',
    async (_, { getState, forceRefetch = true }) => {
        const { users } = getState().app;
        if (!forceRefetch && users.length > 0) {
            return users;
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return await response.json();
    }
);

export const fetchComments = createAsyncThunk(
    'app/fetchComments',
    async (_, { getState, forceRefetch= true }) => {
        const { comments } = getState().app;
        if (!forceRefetch && comments.length > 0) {
            return comments;
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        return await response.json();
    }
);