import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';

export const fetchColor = createAsyncThunk(
    'color',
    async (thunkAPI) => {
      try {
        const response = await ServiceGeneric.getWithToken(
            "color");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);






