import React, { FC, useContext, useEffect } from 'react';
import classes from '../styles/Chat.module.scss';
import Head from 'next/head';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import dynamic from 'next/dynamic';
import { SocketEvents } from '../constants/socketEvents';
import { useAppSelector } from '../store/app/hooks';
import { SocketContext } from '../components/SocketProvider/SocketProvider';

const SidebarMenu = dynamic(
  () => import('../components/SidebarMenu/SidebarMenu'),
  {
    ssr: false,
  }
);

const Chat: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket?.emit(SocketEvents.JOIN, { user });
  }, []);

  return (
    <div className={classes.Container}>
      <Head>
        <title>Messenger - Chat </title>
        <link rel="icon" href="/messenger_icon.png" />
      </Head>
      <div className={classes.Chat}>
        <SidebarMenu />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
