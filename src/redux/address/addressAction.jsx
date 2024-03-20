import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';


export const fetchAddress = createAsyncThunk(
    'address',
    async (thunkAPI) => {
      try {
        const response =  await ServiceGeneric.getWithToken("address/user");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const createAddress = createAsyncThunk(
    'address/create',
    async ({data },thunkAPI) => {
      try {
        const response = await ServiceGeneric.postWithToken("address/create", data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const deleteAddress = createAsyncThunk(
    'address/delete',
    async ({id},thunkAPI) => {
      try {
        const response = await ServiceGeneric.deleteWithToken(`address/delete/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const updateAddress = createAsyncThunk(
    'address/update',
    async ({payload,id },thunkAPI) => {
      try {
        const response = await ServiceGeneric.putWithToken(`address/update/${id}`,payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);