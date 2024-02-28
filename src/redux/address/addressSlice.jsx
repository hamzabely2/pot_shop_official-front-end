import {createSlice} from '@reduxjs/toolkit';
import {
  createAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from './addressAction';
import {
  DisplayApiErrors,
  ToastError,
  ToastSuccess,
} from '../../components/poPup/Toast';

const initialState ={
      address: [],
      isError: false,
      isPending: false,

};

const  addressSlice = createSlice({
  name: "address",
  initialState,
  reducers : {},

  extraReducers: (builder) => {

    //get address
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.isPending = true;
    })
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.isError = false;
      state.isPending = false;
      state.address = action.payload.result;

    })
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.isError = true;
    })

    //create address
    builder.addCase(createAddress.pending, (state, action) => {
      state.isPending = true;
    })
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.isPending = false;
      state.address = [...state.address, action.payload.result];
      ToastSuccess(action.payload.message);
    })
    builder.addCase(createAddress.rejected, (state, action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    })

    //edit address
    builder.addCase(updateAddress.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.isPending = false;
      const editedAddressId = action.payload.result.id;
      const editedAddressIndex = state.address.findIndex(
          address => address.id === editedAddressId);
      if (editedAddressIndex !== -1) {
        state.address[editedAddressIndex] = action.payload.result;
      }
      ToastSuccess(action.payload.message);
    });

    builder.addCase(updateAddress.rejected, (state, action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    });


    //delete address
    builder.addCase(deleteAddress.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.isPending = false;
      state.address = state.address.filter((address) => address.id !==  String(action.payload.result.id));
      ToastSuccess(action.payload.message);
    });

    builder.addCase(deleteAddress.rejected, (state,action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    });
  }
});
export default addressSlice.reducer;