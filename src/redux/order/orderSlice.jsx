import {createSlice} from '@reduxjs/toolkit';
import {createOrder} from './orderAction';


const initialState ={
  order: [],
  isError: false,
  isPending: false,

};

const  orderSlice = createSlice({
  name: "order",
  initialState,
  reducers : {},

  extraReducers: (builder) => {

    //create order
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.color = action.payload.result;
    })
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isError = true;
    })


  }
});
export default orderSlice.reducer;