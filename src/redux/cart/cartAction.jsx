import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';


export const fetchCart = createAsyncThunk(
    'cart',
    async (thunkAPI) => {
      try {
        const response = await ServiceGeneric.getWithToken("cart");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);




export const createCart = createAsyncThunk(
    'cart/create',
    async ({ data },thunkAPI) => {
      try {
        const response = await ServiceGeneric.postWithToken("cart/create", data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const deleteCart = createAsyncThunk(
    'cart/delete',
    async ({ id},thunkAPI) => {
      try {
        const response = await ServiceGeneric.deleteWithToken(`cart/delete/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const updateCart = createAsyncThunk(
    'cart/update',
    async ({payload},thunkAPI) => {
      try {
        const response = await ServiceGeneric.putWithToken(`cart/update`,payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);