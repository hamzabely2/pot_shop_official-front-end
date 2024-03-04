import {createSlice} from '@reduxjs/toolkit';
import {fetchUser, getUser, updateUser} from './userAction';
import {
  DisplayApiErrors,
  ToastError,
  ToastSuccess,
} from '../../components/poPup/Toast';



const  userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: [],
    users : [],
    isError: false
  },
  extraReducers: (builder) => {


    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.result;
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isError = true;
    })


    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.result;
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isError = true;
    })


    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload.result;
      state.isLoading = false;
      state.users = state.users.map(user => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });
      state.user = action.payload.result;
      ToastSuccess(action.payload.message);
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isError = true;
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    })


  }
});
export default userSlice.reducer;