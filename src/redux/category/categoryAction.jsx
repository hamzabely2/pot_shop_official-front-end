import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';

export const fetchCategory = createAsyncThunk(
    'category',
    async (thunkAPI) => {
      try {
        const response = await ServiceGeneric.getWithToken("category");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const createCategory= createAsyncThunk(
    'category/create',
    async ({  payload },thunkAPI) => {
      try {
        const response = await ServiceGeneric.postWithToken("category/create", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

