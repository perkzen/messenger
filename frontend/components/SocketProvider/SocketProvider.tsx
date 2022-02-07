import React, { FC, createContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SERVER } from '../../constants/server';

export const SocketContext = createContext<Socket>(null);

const SocketProvider: FC = ({ children }) => {
  const socket: Socket = io(SERVER);

  useEffect(() => {
    return () => {
      socket.disconnect();
      socket.off();
    };
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
