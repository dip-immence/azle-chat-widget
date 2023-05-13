import { createAsyncThunk } from '@reduxjs/toolkit';
import checkCustomerService from '../services/checkCustomer.service';

export const checkCustomer = createAsyncThunk('post-check-customer', async (payload, thunkAPI) => {
  try {
    const response = await checkCustomerService.postCheckCustomer(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
