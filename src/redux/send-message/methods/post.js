import { createAsyncThunk } from '@reduxjs/toolkit';
import sendMessageService from '../services/sendMessage.service';
import { chatHistory } from '../../chat-history/methods/get';

export const sendMessage = createAsyncThunk('post-send-message', async (payload, thunkAPI) => {
  try {
    const response = await sendMessageService.postSendMessage(payload);
    thunkAPI.dispatch(
      chatHistory({ businessOwnerId: payload.toId, customerId: payload.customerId })
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
