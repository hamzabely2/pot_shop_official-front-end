import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';

export const createOrder = createAsyncThunk(
    'cart/create',
    async ({ payload },thunkAPI) => {
      try {
        const response = await ServiceGeneric.postWithToken("order/create", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

