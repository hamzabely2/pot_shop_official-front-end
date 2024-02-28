import {createSlice} from '@reduxjs/toolkit';
import {
  addColorByItem,
  addImageByItem,
  createItem, deleteColorByItem,
  deleteItem,
  fetchItem, filteredItems,
  getItem,
} from './itemAction';
import {
  DisplayApiErrors,
  ToastError,
  ToastSuccess,
} from '../../components/poPup/Toast';



const  itemSlice = createSlice({
  name: "item",
  initialState: {
    isLoading: false,
    data: [],
    item : null,
    itemFiltered: [],
    isError: false
  },

  extraReducers: (builder) => {


    //get item filters
    builder.addCase(filteredItems.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(filteredItems.fulfilled, (state, action) => {
      console.log(action)
      state.itemFiltered = action.payload.result;
      state.isLoading = false;
    })
    builder.addCase(filteredItems.rejected, (state, action) => {
      console.log(action)
    })

    //get item
    builder.addCase(getItem.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getItem.fulfilled, (state, action) => {
      console.log(action)
      state.item = action.payload.result;
      state.isLoading = false;
    })
    builder.addCase(getItem.rejected, (state, action) => {
      state.isError = true;
    })


    //get all items
    builder.addCase(fetchItem.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.result;
    })
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.isError = true;
    })

    //create item
    builder.addCase(createItem.pending, (state, action) => {
      state.isPending = true;
    })
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = [...state.data, action.payload.result];
      ToastSuccess(action.payload.message);
    });

    builder.addCase(createItem.rejected, (state, action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    })

    //delete item
    builder.addCase(deleteItem.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.result.id);
      ToastSuccess(action.payload.message);
    });

    builder.addCase(deleteItem.rejected, (state,action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    });


    //color
    builder.addCase(addColorByItem.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(addColorByItem.fulfilled, (state, action) => {
      const updatedItem = action.payload.result;
      const itemId = updatedItem.id;

      const itemIndex = state.data.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        state.item.colors = updatedItem.colors;
        state.data[itemIndex].colors = updatedItem.colors;
      }
      ToastSuccess(action.payload.message)

    })
    builder.addCase(addColorByItem.rejected, (state, action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    })

    //add image by item
    builder.addCase(addImageByItem.pending, (state, action) => {
      state.isPending = true;
    })
    builder.addCase(addImageByItem.fulfilled, (state, action) => {
      const updatedItem = action.payload.result;
      const itemId = updatedItem.id;

      const itemIndex = state.data.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        state.item.images = updatedItem.images;
        state.data[itemIndex].iamges = updatedItem.images;
        ToastSuccess(action.payload.message)
      }
    });

    builder.addCase(addImageByItem.rejected, (state, action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    })


    builder.addCase(deleteColorByItem.pending, (state) => {
      state.isPending = true;
      state.isError = false;
    });

    builder.addCase(deleteColorByItem.fulfilled, (state, action) => {
      ToastSuccess(action.payload.message);
    });

    builder.addCase(deleteColorByItem.rejected, (state,action) => {
      ToastError(action.payload.data.message);
      DisplayApiErrors(action.payload.data.errors);
    });




  }
});
export default itemSlice.reducer;