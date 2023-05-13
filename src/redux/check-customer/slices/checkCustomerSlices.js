import { createSlice } from '@reduxjs/toolkit';
import { checkCustomer } from '../methods/post';

const initialState = {
  post: {
    errorMessage: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    info: null,
  },
};

export const checkCustomerSlice = createSlice({
  name: 'check-customer-slice',
  initialState,
  reducers: [],
  extraReducers: {
    // post check customer
    [`${checkCustomer.pending}`]: (state) => {
      state.post.isLoading = true;
      state.post.isSuccess = false;
      state.post.isError = false;
      state.post.errorMessage = '';
    },
    [`${checkCustomer.fulfilled}`]: (state, action) => {
      state.post.info = action.payload?.data?.data?.customer;
      state.post.isLoading = false;
      state.post.isSuccess = true;
      state.post.isError = false;
      state.post.errorMessage =
        action.payload?.data?.code !== 200 && action.payload?.data?.message
          ? action.payload?.data?.message
          : '';
    },
    [`${checkCustomer.rejected}`]: (state, action) => {
      state.post.isLoading = false;
      state.post.isSuccess = false;
      state.post.isError = true;
      state.post.errorMessage = action.payload?.data
        ? action.payload?.data.message
        : action.payload.message;
    },
  },
});

export default checkCustomerSlice.reducer;
