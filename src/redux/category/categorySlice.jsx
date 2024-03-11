import {createSlice} from '@reduxjs/toolkit';
import {createCategory, fetchCategory} from './categoryAction';



const  categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    category: [],
    isError: false
  },
  extraReducers: (builder) => {

    //fetch category
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload.result;
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isError = true;
    })

    //create category
    builder.addCase(createCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      //state.category = action.payload.result;
    })
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isError = true;
    })

  }



});
export default categorySlice.reducer;