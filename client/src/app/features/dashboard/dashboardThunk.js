import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_SERVER_API;

export const getUsers = createAsyncThunk(
    'get/users',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API}/getUsers`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'server error'
            );
        }
    }
);

export const deleteUser = createAsyncThunk(
    'delete/user',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${API}/delete/user${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'server error'
            );
        }
    }
)

export const updateUser = createAsyncThunk(
    'update/user',
    async ({id, status}, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${API}/update/user/${id}`, {status}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'server error'
            );
        }
    }
)

export const addUser = createAsyncThunk(
    'add/user',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API}/addUser`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'server error')
        }
    }
)

export const getUserTask = createAsyncThunk(
    'user/getUserTask',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API}/get-user-tasks/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'server error');
        }
    }
)
