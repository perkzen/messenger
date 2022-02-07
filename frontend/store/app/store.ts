import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import chatReducer from '../features/chatSlice';
import globalReducer from '../features/globalSlice';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchChat } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    chat: chatReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchChat);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
