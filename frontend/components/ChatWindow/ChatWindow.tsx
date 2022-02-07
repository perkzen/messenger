import React, { useContext, useEffect, useRef } from 'react';
import ChatInput from '../ChatInput/ChatInput';
import classes from './ChatWindow.module.scss';
import { Message as MessageType } from '../../store/models/Chat';
import Message from 'components/Message/Message';
import { SocketEvents } from 'constants/socketEvents';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import ChatHeader from '../ChatHeader/ChatHeader';
import { SocketContext } from '../SocketProvider/SocketProvider';
import {
  fetchMessages,
  sendMessage,
  startConversation,
} from '../../store/actions/chatActions';
import { getDateNow, getTimeNow } from '../../utils/dateFomatter';
import Spinner from '../Spinner/Spinner';
import DownButton from '../DownButton/DownButton';
import { useInView } from 'react-intersection-observer';

const ChatWindow = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { receiver, conversationId, messages } = useAppSelector(
    (state) => state.chat
  );
  const { loading } = useAppSelector((state) => state.global);
  const messagesRef = useRef<HTMLDivElement>();
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView();

  const scrollToLastMessage = () => {
    if (messages) {
      const lastMessage = messagesRef?.current?.lastElementChild;
      lastMessage?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  // socket even send message
  const handleSendMessage = (text: string): void => {
    if (text) {
      const message: MessageType = {
        senderId: user._id,
        conversationId,
        text,
        time: getTimeNow(),
        date: getDateNow(),
      };
      socket.emit(SocketEvents.SEND_MESSAGE, {
        senderId: user._id,
        receiverId: receiver._id,
        text,
      });
      dispatch(sendMessage(message));
    }
  };

  //start conversation
  useEffect(() => {
    if (receiver)
      dispatch(
        startConversation({ senderId: user._id, receiverId: receiver._id })
      );
  }, [receiver]);

  //fetch Messages
  useEffect(() => {
    if (receiver) dispatch(fetchMessages(conversationId));
  }, [receiver, conversationId]);

  useEffect(() => {
    socket?.on(SocketEvents.RECEIVE_MESSAGE, () => {
      // could optimize
      dispatch(fetchMessages(conversationId));
    });
  }, [messages]);

  useEffect(() => {
    if (receiver) scrollToLastMessage();
  }, [messagesRef, messages]);

  return (
    <div className={classes.Container}>
      {receiver && (
        <>
          <div>
            <ChatHeader user={receiver} />
          </div>
          <div className={classes.Chat}>
            {loading ? (
              <div className={classes.Spinner}>
                <Spinner />
              </div>
            ) : (
              <>
                <div className={classes.Messages} ref={messagesRef}>
                  {messages.map((message: MessageType, i) => (
                    <Message
                      message={message}
                      key={v4()}
                      lastMessageRef={i === messages.length - 1 ? ref : null}
                    />
                  ))}
                </div>
                {!inView && messages.length > 0 && (
                  <div
                    className={classes.DownButton}
                    onClick={() => scrollToLastMessage()}
                  >
                    <DownButton />
                  </div>
                )}
              </>
            )}
          </div>
          <ChatInput sendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
