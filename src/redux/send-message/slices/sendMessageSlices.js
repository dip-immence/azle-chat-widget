import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from '../methods/post';

const initialState = {
  post: {
    errorMessage: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    info: null,
  },
};

export const sendMessageSlice = createSlice({
  name: 'send-message-slice',
  initialState,
  reducers: [],
  extraReducers: {
    // post check customer
    [`${sendMessage.pending}`]: (state) => {
      state.post.isLoading = true;
      state.post.isSuccess = false;
      state.post.isError = false;
      state.post.errorMessage = '';
    },
    [`${sendMessage.fulfilled}`]: (state, action) => {
      state.post.info = action.payload.data;
      state.post.isLoading = false;
      state.post.isSuccess = true;
      state.post.isError = false;
      state.post.errorMessage = '';
    },
    [`${sendMessage.rejected}`]: (state, action) => {
      state.post.isLoading = false;
      state.post.isSuccess = false;
      state.post.isError = true;
      state.post.errorMessage = action.payload.data
        ? action.payload.data.message
        : action.payload.message;
    },
  },
});

export default sendMessageSlice.reducer;
