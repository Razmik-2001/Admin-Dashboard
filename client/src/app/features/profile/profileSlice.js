import {createSlice} from "@reduxjs/toolkit";
import {changePassword, changeUserInfo, uploadProfileImage} from './profileThunk';

const profileSlice = createSlice({
    name: "profileSlice",
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state, action) => {
                state.loading = true;
                state.message = null;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.message = null;
                state.error = action.payload;
            })
            .addCase(changeUserInfo.pending, (state, action) => {
                state.loading = true;
                state.message = null;
                state.error = null;
            })
            .addCase(changeUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(changeUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.message = null;
                state.error = action.payload;
            })
            .addCase(uploadProfileImage.pending, (state, action) => {
                state.loading = true;
                state.message = null;
                state.error = null;
            })
            .addCase(uploadProfileImage.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(uploadProfileImage.rejected, (state, action) => {
                state.loading = false;
                state.message = null;
                state.error = action.payload;
            })
    }
});

export const {resetError, resetMessage} = profileSlice.actions;
export default profileSlice.reducer;