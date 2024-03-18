import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';

export const login = createAsyncThunk(
    'login',
    async ({ payload },thunkAPI) => {
      try {
        const response = await ServiceGeneric.post("login", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const register = createAsyncThunk(
    'register',
    async ({ payload },thunkAPI) => {
      try {
        const response = await ServiceGeneric.post("register", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);







