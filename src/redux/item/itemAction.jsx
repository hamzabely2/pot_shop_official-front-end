import {createAsyncThunk} from '@reduxjs/toolkit';
import ServiceGeneric from '../../service/ServiceGenerique';




export const filteredItems = createAsyncThunk(
    'item/filtered',
    async (payload,thunkAPI) => {
      try {
        const response = await ServiceGeneric.post(
            "item/filtered",payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const fetchItem = createAsyncThunk(
    'item',
    async (thunkAPI) => {
      try {
        const response = await ServiceGeneric.get(
            "item");
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const getItem = createAsyncThunk(
    'item/one',
    async (id,thunkAPI) => {
      console.log(id)
      try {
        const response =  await ServiceGeneric.get(`item/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const createItem = createAsyncThunk(
    'item/create',
    async ({  payload },thunkAPI) => {
      console.log(payload);
      try {
        const response = await ServiceGeneric.postWithTokenAndContentType("item/create", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);



export const deleteItem = createAsyncThunk(
    'item/delete',
    async ({ token,id},thunkAPI) => {
      try {
        const response = await ServiceGeneric.deleteWithToken(`item/delete/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const addImageByItem = createAsyncThunk(
    'item/create/image',
    async ({payload },thunkAPI) => {
      try {
        const response = await ServiceGeneric.postWithTokenAndContentType("item/create/image", payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);


export const addColorByItem = createAsyncThunk(
    'color/item',
    async ({ payload},thunkAPI) => {
      try {
        const response = await ServiceGeneric.postWithToken("item/create/color",payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const deleteColorByItem = createAsyncThunk(
    'color/delete',
    async ({ payload},thunkAPI) => {
      try {
        const response = await ServiceGeneric.deleteWithToken(`item/delete/color`,payload);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

