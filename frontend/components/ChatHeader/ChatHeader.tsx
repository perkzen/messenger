import React, { FC } from 'react';
import classes from './ChatHeader.module.scss';
import { User } from '../../store/models/Auth';
import UserStatus from '../UserStatus/UserStatus';

interface ChatHeaderProps {
  user: User;
}
const ChatHeader: FC<ChatHeaderProps> = ({ user }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Status}>
        <UserStatus user={user} />
      </div>
      <div className={classes.Col}>
        <h2>{user.username}</h2>
        <small>Active now</small>
      </div>
    </div>
  );
};

export default ChatHeader;
