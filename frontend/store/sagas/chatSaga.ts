import {
  fetchMessagesSuccess,
  sendMessage,
  sendMessageSuccess,
  startConversation,
  startConversationSuccess,
} from '../actions/chatActions';
import { put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { Error, Routes, SERVER } from '../../constants/server';
import { Conversation, Message } from '../models/Chat';
import { addError, setLoading } from '../features/globalSlice';

export function* startConversationSaga(
  action: ReturnType<typeof startConversation>
): Generator {
  try {
    yield put(setLoading(true));
    const res = (yield axios.post(SERVER + Routes.CONVERSATION, {
      ...action.payload,
    })) as AxiosResponse<Conversation>;
    yield put(startConversationSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    yield put(addError(error.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* sendMessageSaga(
  action: ReturnType<typeof sendMessage>
): Generator {
  try {
    const res = (yield axios.post(SERVER + Routes.MESSAGE, {
      ...action.payload,
    })) as AxiosResponse<Message>;
    yield put(sendMessageSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    yield put(addError(error.response.data.message));
  }
}

export function* fetchMessagesSaga(
  action: ReturnType<typeof sendMessage>
): Generator {
  try {
    const res = (yield axios.post(SERVER + Routes.CONVERSATION_MESSAGES, {
      conversationId: action.payload,
    })) as AxiosResponse<Message[]>;
    yield put(fetchMessagesSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    yield put(addError(error.response.data.message));
  }
}
