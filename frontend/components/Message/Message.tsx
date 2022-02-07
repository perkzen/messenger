import React, { FC } from 'react';
import classes from './Message.module.scss';
import { Message } from '../../store/models/Chat';
import { useAppSelector } from '../../store/app/hooks';
import classNames from 'classnames';

interface MessageProps {
  message: Message;
  lastMessageRef?: (node?: Element) => void;
}

const Message: FC<MessageProps> = ({ message, lastMessageRef }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <div
        className={classNames(
          classes.Container,
          user._id === message.senderId
            ? classes.justifyEnd
            : classes.justifyStart
        )}
        ref={lastMessageRef}
      >
        <div
          className={classNames(
            classes.messageBox,
            user._id === message.senderId
              ? classes.SentByMe
              : classes.NotSentByMe
          )}
        >
          <p className={classNames(classes.messageText)}>{message.text}</p>
        </div>
        <small>{`${message.time} ${message.date}`}</small>
      </div>
    </>
  );
};

export default Message;
