import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'src/@core/utils/axios';
import { Item, ItemState } from 'src/@type/item';

//
import { dispatch } from 'src/redux/store';

const initialState: ItemState = {
  isLoading: false,
  error: null,
  items: [],
  item: null,
  sortBy: null,
  filters: {
    name: '',
    stock: null,
  },
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.name = action.payload.name;
      state.filters.stock = action.payload.stock;
    },
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  sortByProducts,
  filterProducts,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { products: Item[] } } = await axios.get('/api/products');
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
