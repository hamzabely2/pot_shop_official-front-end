import {createSlice} from '@reduxjs/toolkit';
import {
  DisplayApiErrors,
  ToastError,
  ToastSuccess,
} from '../../components/poPup/Toast';
import {createCart, deleteCart, fetchCart, updateCart} from './cartAction';

const initialState ={
  cart: [],
  isError: false,
  isPending: false,

};

const  cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers : {},

  extraReducers: (builder) => {

    //get cart
    builder.addCase(fetchCart.pending, (state, action) => {
      state.isPending = true;
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      console.log(action)
      state.isError = false;
      state.isPending = false;
      state.cart = action.payload.result;

    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isError = true;
    })

    //create cart
    builder.addCase(createCart.pending, (state, action) => {
      state.isPending = true;
    })
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.isPending = false;
      const newItem = action.payload.result;
      const existingItem = state.cart.find(item => item.items.id === newItem.items.id);

      if (existingItem) {
        existingItem.quantity = action.payload.result.quantity;
        existingItem.subtotal = action.payload.result.subtotal;
        ToastSuccess("Le produit existe déjà dans le panier, la quantité a été mise à jour");
      } else {
        state.cart.push(newItem);
        ToastSuccess(action.payload.message);
      }
    });

    builder.addCase(createCart.rejected, (state, action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    })


    //update cart
    builder.addCase(updateCart.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.isPending = false;
      const existingItem = state.cart.find(item => item.items.id === action.payload.result[0].items.id);
      if (existingItem) {
        existingItem.quantity = action.payload.result[0].quantity;
        existingItem.subtotal = action.payload.result[0].subtotal;
      }
      ToastSuccess(action.payload.message);
    });

    builder.addCase(updateCart.rejected, (state,action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    });


    //delete cart
    builder.addCase(deleteCart.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.isPending = false;
      state.cart = state.cart.filter((cart) => cart.items.id !== action.payload.result[0].items.id);

      ToastSuccess(action.payload.message);
    });

    builder.addCase(deleteCart.rejected, (state,action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    });

  }
});
export default cartSlice.reducer;