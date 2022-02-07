import React, { FC } from 'react';
import classNames from 'classnames';
import classes from './UserStatus.module.scss';
import Avatar from '../Avatar/Avatar';
import { User } from '../../store/models/Auth';

interface UserStatusProps {
  user: User;
}

const UserStatus: FC<UserStatusProps> = ({ user }) => {
  return (
    <span className={classNames(classes.Status)}>
      <Avatar avatar={user.avatar} width={50} height={50} />
      <span className={classes.PingContainer}>
        <span className={classes.PingPulse} />
        <span className={classes.Ping} />
      </span>
    </span>
  );
};

export default UserStatus;
