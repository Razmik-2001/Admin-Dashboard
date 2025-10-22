import {createSlice} from "@reduxjs/toolkit";
import {getAllNotifications} from "./notificationThunk";

const initialState = {
    notif: [],
    loading: false,
    error: null,
    message: null,
    success: false,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.success = false;
                state.notif = [];
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.notif = Array.isArray(action.payload?.notifications)
                    ? action.payload.notifications
                    : [];
                state.loading = false;
                state.error = null;
                state.message = action.payload?.message || null;
                state.success = true;
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.notif = [];
                state.loading = false;
                state.error = action.payload || "Server Error";
                state.message = null;
                state.success = false;
            });
    },
});

export default notificationSlice.reducer;
