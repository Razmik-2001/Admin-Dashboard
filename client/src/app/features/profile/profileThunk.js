import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_SERVER_API;

export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async (data, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${API}/change-password`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (err) {
            console.log(err.response?.data?.message); // "Wrong current password"
            return rejectWithValue(err.response?.data?.message || 'Server Error');
        }
    }
)

export const changeUserInfo = createAsyncThunk(
    "profile/changeUserInfo",
    async (data, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${API}/changeUserInfo`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Server Error');
        }
    }
)

export const uploadProfileImage = createAsyncThunk(
    "profile/uploadProfileImage",
    async (formData, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API}/upload-avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Image upload failed");
        }
    }
);