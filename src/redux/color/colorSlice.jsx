import {createSlice} from '@reduxjs/toolkit';
import { fetchColor} from './colorAction';


const initialState ={
  color: [],
  isError: false,
  isPending: false,

};

const  colorSlice = createSlice({
  name: "color",
  initialState,
  reducers : {},

  extraReducers: (builder) => {

    //fetch all colors
    builder.addCase(fetchColor.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.color = action.payload.result;
    })
    builder.addCase(fetchColor.rejected, (state, action) => {
      state.isError = true;
    })






  }
});
export default colorSlice.reducer;