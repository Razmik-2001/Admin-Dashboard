import {configureStore} from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice'
import dashboardSlice from "./features/dashboard/dashboardSlice";
import taskSlice from "./features/tasks/taskSlice";
import notificationSlice from "./features/notifications/notificationSlice";
import profileSlice from './features/profile/profileSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        tasks: taskSlice,
        notif: notificationSlice,
        profile: profileSlice,
    },
    devTools: true,
})

export default store;