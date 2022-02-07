import classes from './Button.module.scss';
import { FC } from 'react';
import Spinner from '../Spinner/Spinner';
import classNames from 'classnames';

interface ButtonProps {
  label: string;
  type?: Type;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  animation?: boolean;
  className?: string;
}

type Variant = 'primary' | 'secondary';
type Type = 'submit' | 'button';

const Button: FC<ButtonProps> = ({
  label,
  type = 'button',
  onClick,
  disabled = false,
  loading,
  animation,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(classes.Button, className, {
        [classes.NotDisabled]: !disabled && !loading,
        [classes.Animation]: animation,
      })}
      disabled={disabled}
    >
      {loading ? (
        <span>
          <Spinner />
          <label>Loading...</label>
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
