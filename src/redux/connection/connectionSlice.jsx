import {createSlice} from '@reduxjs/toolkit';
import {login,register} from './connectionAction';


const initialState ={
  user: [],
  isError: false,
  isPending: false,

};

const  colorSlice = createSlice({
  name: "connection",
  initialState,
  reducers : {},

  extraReducers: (builder) => {

    //fetch all colors
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;

    })
    builder.addCase(login.rejected, (state, action) => {
      state.isError = true;
    })



    //fetch all colors
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;

    })
    builder.addCase(register.rejected, (state, action) => {
      state.isError = true;
    })






  }
});
export default colorSlice.reducer;