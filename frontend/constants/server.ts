export const SERVER = 'http://localhost:5000';

export enum Routes {
  REGISTER = `/register`,
  LOGIN = '/login',
  CONVERSATION = '/api/conversation',
  CONVERSATION_MESSAGES = '/api/conversation/messages',
  MESSAGE = '/api/message',
}

export interface Error {
  response: {
    data: {
      message: string;
    };
  };
}
