import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_SERVER_API;

export const addTask = createAsyncThunk(
    'add/todo',
    async ({data, id}, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API}/addTask/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Server Error'
            );
        }
    }
);

export const fetchTasks = createAsyncThunk(
    'add/addTask',
    async (_, {rejectWithValue}) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API}/getTasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Server Error');
        }
    }
)

export const updateTaskStatus = createAsyncThunk(
    'update/updateTaskStatus',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API}/update-status/${id}`, {}, {
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

export const deleteTask = createAsyncThunk(
    'delete/deleteTask',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API}/delete-task/${id}`, {
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


export const getAllTask = createAsyncThunk(
    'tasks/getTotalTasksCount',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API}/get-all-task`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch total tasks count');
        }
    }
);