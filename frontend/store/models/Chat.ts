export interface Message {
  conversationId: string;
  senderId: string;
  text: string;
  date: string;
  time: string;
}

export interface Conversation {
  _id: string;
  members: string[];
}

export interface ConversationRequest {
  senderId: string;
  receiverId: string;
}
