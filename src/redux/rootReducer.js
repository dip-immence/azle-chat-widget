//take all the slices that we are creating (combined all the reducers)
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/app';
import checkCustomerSlice from './check-customer/slices/checkCustomerSlices';
import chatHistorySlice from './chat-history/slices/chatHistorySlices';
import sendMessageSlice from './send-message/slices/sendMessageSlices';

//slices

//create root configuration (how data store and how read out data from store)
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  // whitelist:[],
  // blacklist:[]
};

//create combine reducer
const rootReducer = combineReducers({
  app: appReducer,
  checkCustomer: checkCustomerSlice,
  chatHistory: chatHistorySlice,
  sendMessage: sendMessageSlice,
});

export { rootPersistConfig, rootReducer };
