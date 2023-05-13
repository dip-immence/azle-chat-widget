import { createAsyncThunk } from '@reduxjs/toolkit';
import chatHistoryService from '../services/chatHistoryService.service';

export const chatHistory = createAsyncThunk('get-chat-history', async (payload, thunkAPI) => {
  try {
    const response = await chatHistoryService.getChatHistory(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
