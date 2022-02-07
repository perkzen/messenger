import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/Auth';
import { Message } from '../models/Chat';
import {
  fetchMessagesSuccess,
  sendMessageSuccess,
  startConversationSuccess,
} from '../actions/chatActions';

export interface ChatState {
  receiver: User;
  conversationId: string;
  messages: Message[];
}

const initialState: ChatState = {
  receiver: undefined,
  conversationId: '',
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pickReceiver: (state, action: PayloadAction<User>) => {
      state.receiver = action.payload;
    },
    appendMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startConversationSuccess, (state, action) => {
        state.conversationId = action.payload._id;
      })
      .addCase(sendMessageSuccess, (state, action) => {
        state.messages = [...state.messages, action.payload];
      })
      .addCase(fetchMessagesSuccess, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { pickReceiver, appendMessage } = chatSlice.actions;

export default chatSlice.reducer;
