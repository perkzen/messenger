import Head from 'next/head';
import Input from '../components/Input/Input';
import classes from '../styles/Home.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../components/Button/Button';
import Image from 'next/image';
import icon from 'assets/messenger_icon.png';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { Paths } from '../constants/paths';
import Link from 'next/link';
import { login } from '../store/actions/authActions';
import { removeError } from '../store/features/globalSlice';

interface LoginFormData {
  username: string;
  password: string;
}

const defaultValues: LoginFormData = {
  username: '',
  password: '',
};

export default function Home() {
  const dispatch = useAppDispatch();
  const { loading, apiError } = useAppSelector((state) => state.global);

  const { handleSubmit, register, formState } = useForm<LoginFormData>({
    mode: 'onSubmit',
    defaultValues,
  });

  useEffect(() => {
    return () => {
      dispatch(removeError());
    };
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    dispatch(login({ username: data.username, password: data.password }));
  };

  const isDisabled =
    formState.dirtyFields.username && formState.dirtyFields.password;

  return (
    <div className={classes.Container}>
      <Head>
        <title>Messenger - Login</title>
      </Head>
      <Image src={icon} width={150} height={150} />
      <h1>Welcome to Messenger</h1>
      {apiError && <p>{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          id={'username'}
          className={classes.Input}
          placeholder={'Username'}
        />
        <Input
          register={register}
          id={'password'}
          type={'password'}
          className={classes.Input}
          placeholder={'Password'}
        />
        <Button
          label={'Login'}
          type={'submit'}
          disabled={!isDisabled}
          loading={loading}
        />
        <div>
          Don't have a account?{' '}
          <span className={classes.Link}>
            <Link href={Paths.REGISTER}>Click here</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
