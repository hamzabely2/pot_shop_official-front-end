import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';

export const fetchUser = createAsyncThunk(
    'user',
    async (thunkAPI) => {
      try {
        const response =  await ServiceGeneric.getWithToken("user");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getUser = createAsyncThunk(
    'user/name',
    async (thunkAPI) => {
      try {
        const response =  await ServiceGeneric.getWithToken("user/name");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async (payload,thunkAPI) => {
      try {
        const response =  await ServiceGeneric.putWithToken("user/update",payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (payload,thunkAPI) => {
      try {
        const response =  await ServiceGeneric.deleteWithToken("user/delete",payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);