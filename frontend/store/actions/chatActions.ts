import { createAction } from '@reduxjs/toolkit';
import { Conversation, ConversationRequest, Message } from '../models/Chat';

export const CHAT_SLICE = 'chat';

export const startConversation = createAction<ConversationRequest>(
  `${CHAT_SLICE}/startConversation`
);
export const startConversationSuccess = createAction<Conversation>(
  `${CHAT_SLICE}/startConversationSuccess`
);

export const sendMessage = createAction<Message>(`${CHAT_SLICE}/sendMessage`);
export const sendMessageSuccess = createAction<Message>(
  `${CHAT_SLICE}/sendMessageSuccess`
);

export const fetchMessages = createAction<string>(`${CHAT_SLICE}/fetchMessage`);
export const fetchMessagesSuccess = createAction<Message[]>(
  `${CHAT_SLICE}/fetchMessageSuccess`
);
