import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';

export const fetchMaterial = createAsyncThunk(
    'material',
    async (thunkAPI) => {
      try {
        const response =  await ServiceGeneric.getWithToken("material");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

