import { createSlice } from '@reduxjs/toolkit';
import { chatHistory } from '../methods/get';

const initialState = {
  get: {
    errorMessage: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    chatHistoryInfo: null,
  },
};

export const chatHistorySlice = createSlice({
  name: 'chat-history-slice',
  initialState,
  reducers: [],
  extraReducers: {
    // get chat History
    [`${chatHistory.pending}`]: (state) => {
      state.get.isLoading = true;
      state.get.isSuccess = false;
      state.get.isError = false;
      state.get.errorMessage = '';
    },
    [`${chatHistory.fulfilled}`]: (state, action) => {
      state.get.chatHistoryInfo = action.payload?.data?.data;
      state.get.isLoading = false;
      state.get.isSuccess = true;
      state.get.isError = false;
      state.get.errorMessage = '';
    },
    [`${chatHistory.rejected}`]: (state, action) => {
      state.get.isLoading = false;
      state.get.isSuccess = false;
      state.get.isError = true;
      state.get.errorMessage = action.payload.data
        ? action.payload.data.message
        : action.payload.message;
    },
  },
});

export default chatHistorySlice.reducer;
