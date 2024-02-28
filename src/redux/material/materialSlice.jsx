import {createSlice} from '@reduxjs/toolkit';
import {fetchMaterial} from './materialAction';



const  materialSlice = createSlice({
  name: "material",
  initialState: {
    isLoading: false,
    material: [],
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMaterial.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchMaterial.fulfilled, (state, action) => {
      state.isLoading = false;
      state.material = action.payload.result;
    })
    builder.addCase(fetchMaterial.rejected, (state, action) => {
      state.isError = true;
    })


  }
});
export default materialSlice.reducer;