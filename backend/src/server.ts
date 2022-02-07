import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { default as AuthRouter } from "./routes/auth";
import { SocketEventsServer } from "./socketEventsServer";
import { default as ConversationRouter } from "./routes/conversation";
import { default as MessageRouter } from "./routes/message";
import { Routes } from "./constants/routes";
import { SendMessageType, SocketJoinResponse, User } from "./types/interfaces";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(AuthRouter);
app.use(Routes.CONVERSATION, ConversationRouter);
app.use(Routes.MESSAGE, MessageRouter);

//TODO store online user in database???
let onlineUsers: User[] = [];

const addUser = (user: User) => {
  onlineUsers.push(user);
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((obj) => obj.socketId !== socketId);
};

const getUser = (id: string) => {
  return onlineUsers.find((obj) => obj._id === id);
};

const uri: string = process.env.DATABASE_URL || "";

mongoose.connect(uri, (err) => (err ? console.log(err) : ""));

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

io.on(SocketEventsServer.CONNECTION, (socket) => {
  socket.on(
    SocketEventsServer.SEND_MESSAGE,
    ({ senderId, receiverId, text, date, time }: SendMessageType) => {
      const user: User = getUser(receiverId)!;
      io.to(user.socketId).emit(SocketEventsServer.RECEIVE_MESSAGE, {
        senderId,
        text,
        date,
        time,
      });
    }
  );

  socket.on(SocketEventsServer.JOIN, async ({ user }: SocketJoinResponse) => {
    addUser({ ...user, socketId: socket.id });
    io.emit(SocketEventsServer.GET_USERS, onlineUsers);
  });

  socket.on(SocketEventsServer.DISCONNECT, async () => {
    removeUser(socket.id);
    io.emit(SocketEventsServer.GET_USERS, onlineUsers);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
