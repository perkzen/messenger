import { takeLatest } from 'redux-saga/effects';
import { AuthLoginSaga } from './authSaga';
import {
  startConversationSaga,
  sendMessageSaga,
  fetchMessagesSaga,
} from './chatSaga';
import { login } from '../actions/authActions';
import {
  fetchMessages,
  sendMessage,
  startConversation,
} from '../actions/chatActions';

export function* watchAuth(): Generator {
  yield takeLatest(login.type, AuthLoginSaga);
}

export function* watchChat(): Generator {
  yield takeLatest(startConversation.type, startConversationSaga);
  yield takeLatest(sendMessage.type, sendMessageSaga);
  yield takeLatest(fetchMessages.type, fetchMessagesSaga);
}
