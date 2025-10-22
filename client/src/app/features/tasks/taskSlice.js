import {createSlice} from '@reduxjs/toolkit';
import {deleteTask, fetchTasks, getAllTask, updateTaskStatus} from './taskThunk';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        allTasks: [],
        loading: false,
        error: null,
        success: false,
        message: '',
        totalTasks: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = '';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = '';
            })

            // Update task status
            .addCase(updateTaskStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = '';
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const updatedTask = action.payload.task;

                state.tasks = state.tasks.map(task =>
                    task._id === updatedTask._id ? updatedTask : task
                );

                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = '';
            })

            .addCase(deleteTask.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.succes = false;
                state.message = ''
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload.task._id);
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.succes = false;
                state.message = ''
            })
            .addCase(getAllTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = '';
            })
            .addCase(getAllTask.fulfilled, (state, action) => {
                state.loading = false;
                state.allTasks = action.payload.allTasks;
                state.message = action.payload.message;
                state.success = false;
            })
            .addCase(getAllTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.succes = false;
            });
    }
});

export default taskSlice.reducer;
