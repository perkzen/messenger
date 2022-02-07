import React, { FC } from 'react';
import classes from './Avatar.module.scss';

import Image from 'next/image';
import classNames from 'classnames';

interface AvatarProps {
  avatar: string;
  width?: number;
  height?: number;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  avatar,
  width = 100,
  height = 100,
  className,
}) => {
  return (
    <Image
      src={avatar}
      width={width}
      height={height}
      className={classNames('rounded-full', className)}
    />
  );
};

export default Avatar;
