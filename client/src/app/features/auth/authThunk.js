import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_SERVER_API;

export const register = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/register`, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'server error');
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/login`, data);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'server error');
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (_, {rejectWithValue}) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return rejectWithValue('No token, please login');
        }
        try {
            const response = await axios.get(`${API}/getUserInfo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'server error');
        }
    }
)
