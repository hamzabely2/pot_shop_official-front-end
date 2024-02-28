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

