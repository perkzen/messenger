export interface SendMessageType {
  senderId: string;
  receiverId: string;
  text: string;
  date: string;
  time: string;
}

export interface User {
  _id: string;
  username: string;
  socketId: string;
  avatar: string;
}

export interface SocketJoinResponse {
  user: User;
}
