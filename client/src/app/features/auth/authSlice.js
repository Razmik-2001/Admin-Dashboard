import {createSlice} from '@reduxjs/toolkit';
import {getUserInfo, login, register} from './authThunk';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        success: null,
        error: null,
        loading: false,
        message: ''
    },
    reducers: {
        resetAuthState: (state) => {
            state.user = null;
            state.success = false;
            state.error = null;
            state.loading = false;
            state.message = '';
        },
        resetMessage: (state) => {
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = '';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload?.message || 'registered successfully';
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = '';
            })
            .addCase(login.pending, (state, action) => {
                state.user = null;
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload?.user;
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload?.message || 'login successfully';
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = '';
            })
            .addCase(getUserInfo.pending, (state, action) => {
                state.user = null;
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = '';
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.user = action.payload?.user;
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload?.message || 'login successfully';
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = '';
            })
    }
});

export const {resetAuthState, resetMessage} = authSlice.actions;
export default authSlice.reducer;
