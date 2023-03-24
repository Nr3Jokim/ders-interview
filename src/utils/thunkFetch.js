import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('app/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await response.json();
});

export const fetchUsers = createAsyncThunk('app/fetchUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
});

export const fetchComments = createAsyncThunk('app/fetchComments', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    return await response.json();
});