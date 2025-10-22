import {createSlice} from "@reduxjs/toolkit";
import {addUser, deleteUser, getUsers, getUserTask, updateUser} from './dashboardThunk';

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        users: null,
        tasks: null,
        loading: false,
        error: null,
        success: false,
        message: "",
    },
    reducers: {
        resetDashboard: (state) => {
            state.users = null;
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },
        resetError: (state) => {
            state.error = '';
        },
        resetMessage: (state) => {
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.users = null;
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.users = null;
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                if (state.users) {
                    state.users = state.users.filter(user => user._id !== action.payload.userId);
                }
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;

                if (state.users) {
                    state.users = state.users.map(user =>
                        user._id === action.payload.user._id ? action.payload.user : user
                    );
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
            })
            .addCase(addUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = '';
            })
            .addCase(getUserTask.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = "";
                state.tasks = null;
            })
            .addCase(getUserTask.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
                state.tasks = action.payload.tasks;
            })
            .addCase(getUserTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = "";
                state.tasks = null;
            })
    }
});

export const {resetDashboard, resetError, resetMessage} = dashboardSlice.actions;
export default dashboardSlice.reducer;
