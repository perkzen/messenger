import React, { FC, HTMLProps } from 'react';
import { UseFormRegister } from 'react-hook-form';
import classes from './Input.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
  type?: InputType;
  register?: UseFormRegister<any>;
  id?: string;
  className?: string;
  errors?: any;
}

type InputType = 'text' | 'number' | 'password';

const Input: FC<InputProps> = ({
  placeholder,
  id,
  register,
  type = 'text',
  className,
  errors,
}) => {
  const showError = () => {
    if (errors && errors.hasOwnProperty(id)) {
      return <small>{errors[id].message}</small>;
    }
  };

  return (
    <div className={classes.Input}>
      <input
        id={id}
        {...register(id, { required: 'This filed is required!' })}
        type={type}
        placeholder={placeholder}
        className={className}
        autoComplete={'off'}
      />
      {showError()}
    </div>
  );
};

export default Input;
