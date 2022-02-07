import React, { useEffect, useState } from 'react';
import classes from '../styles/Register.module.scss';
import { useForm } from 'react-hook-form';
import { useDebounce } from '../utils/useDebounce';
import axios from 'axios';
import Avatar from '../components/Avatar/Avatar';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { BiArrowBack } from 'react-icons/bi';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Paths } from '../constants/paths';
import { Error, Routes, SERVER } from '../constants/server';
import { useAppDispatch } from '../store/app/hooks';
import { addModal } from '../store/features/globalSlice';
import { ModalType } from '../store/models/Modal';

interface RegisterFormData {
  username: string;
  password: string;
  repeatPassword: string;
}

const defaultValues: RegisterFormData = {
  username: '',
  password: '',
  repeatPassword: '',
};

const Register = () => {
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handleSubmit, register, formState, watch, reset } =
    useForm<RegisterFormData>({
      mode: 'onSubmit',
      defaultValues,
    });

  const { username } = watch();

  const debounceUsername = useDebounce(username, 500);

  const generateAvatar = async (username: string): Promise<string> => {
    const res = await axios.post('/api/avatar', { name: username });
    const { avatar } = res.data;
    return avatar;
  };

  useEffect(() => {
    generateAvatar(debounceUsername)
      .then((res) => setAvatar(res))
      .catch((err) => console.log(err));
  }, [debounceUsername]);

  const { dirtyFields, errors } = formState;

  const isDisabled = (): boolean | undefined => {
    return (
      dirtyFields.username && dirtyFields.password && dirtyFields.repeatPassword
    );
  };

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    if (data.password !== data.repeatPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post(SERVER + Routes.REGISTER, {
        username: data.username,
        password: data.password,
        avatar,
      });

      if (res.status === 200) {
        reset();
        dispatch(
          addModal({
            modalType: ModalType.SUCCESS,
            body: 'Your account was successfully created.',
          })
        );
        await router.push(Paths.LOGIN);
      }
    } catch (err) {
      const error = err as Error;
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className={classes.Container}>
      <Head>
        <title>Messenger - Register</title>
      </Head>
      <BiArrowBack
        className={classes.BackButton}
        onClick={() => router.push(Paths.LOGIN)}
      />
      <div className={classes.Box}>
        <h1>Register</h1>
        {avatar && username && (
          <div className={classes.Avatar}>
            <Avatar avatar={avatar} />
          </div>
        )}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder={'Username'} register={register} id={'username'} />
          <Input
            placeholder={'Password'}
            register={register}
            id={'password'}
            type={'password'}
            errors={errors}
          />
          <Input
            placeholder={'Repeat password'}
            register={register}
            id={'repeatPassword'}
            type={'password'}
            errors={errors}
          />
          <Button
            type={'submit'}
            disabled={!isDisabled()}
            className={classes.Primary}
            label={'Register'}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
