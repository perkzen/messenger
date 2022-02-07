import React, { FC } from 'react';
import classes from './OnlineUser.module.scss';
import { User } from '../../store/models/Auth';
import UserStatus from '../UserStatus/UserStatus';

interface OnlineUserProps {
  user: User;
  onClick: () => void;
}

const OnlineUser: FC<OnlineUserProps> = ({ user, onClick }) => {
  return (
    <div className={classes.Container} onClick={onClick}>
      <UserStatus user={user} />
      <h2>{user.username}</h2>
    </div>
  );
};

export default OnlineUser;
