import { configureStore } from '@reduxjs/toolkit';
import itemSlice from './item/itemSlice';
import addressSlice from './address/addressSlice';
import cartSlice from './cart/cartSlice';
import colorSlice from './color/colorSlice';
import categorySlice from './category/categorySlice';
import materialSlice from './material/materialSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    item : itemSlice,
    address : addressSlice,
    cart: cartSlice,
    color : colorSlice,
    category: categorySlice,
    material : materialSlice,
    user : userSlice
  }
});