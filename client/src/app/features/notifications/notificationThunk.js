import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_SERVER_API;

export const getAllNotifications = createAsyncThunk(
    'notifications/getAllNotifications',
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Server Error');
        }
    }
)

export const readAllNotif = createAsyncThunk(
    'notifications/readAllNotif',
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API}/read-all`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Server Error');
        }
    }
)


export const readOneNotification = createAsyncThunk(
    'notifications/readOneNotification',
    async (notificationId, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/notification/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Server Error');
        }
    }
);