import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from './taskAPI';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await fetchTasksAPI();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (task, thunkAPI) => {
  try {
    const { data } = await createTaskAPI(task);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async (task, thunkAPI) => {
  try {
    if (!task.id) {
      console.error("Missing task._id in updateTask thunk:", task);
      throw new Error("Task ID is required for update.");
    }
    const { data } = await updateTaskAPI(task);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await deleteTaskAPI(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});