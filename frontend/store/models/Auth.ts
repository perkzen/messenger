export interface User {
  _id: string;
  username: string;
  avatar: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
