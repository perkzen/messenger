import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import classes from './SidebarMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { useRouter } from 'next/router';
import Input from '../Input/Input';
import { useForm } from 'react-hook-form';
import { User } from '../../store/models/Auth';
import OnlineUser from '../OnlineUser/OnlineUser';
import { v4 } from 'uuid';
import UserStatus from '../UserStatus/UserStatus';
import { SocketEvents } from '../../constants/socketEvents';
import { SocketContext } from '../SocketProvider/SocketProvider';
import { pickReceiver } from '../../store/features/chatSlice';
import { logout } from '../../store/actions/authActions';
import { addModal } from '../../store/features/globalSlice';
import { ModalType } from '../../store/models/Modal';

interface SearchData {
  text: string;
}

const defaultValues: SearchData = {
  text: '',
};

const SidebarMenu = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const socket = useContext(SocketContext);
  const [info, setInfo] = useState('');

  const handleLogout = async () => {
    await router.push('/');
    dispatch(logout());
  };

  useEffect(() => {
    if (!loggedUser) {
      router.push('/').then(() =>
        dispatch(
          addModal({
            body: 'You need to login before entering chat!',
            modalType: ModalType.WARNING,
          })
        )
      );
    }
  }, []);

  useEffect(() => {
    // online users
    socket.on(SocketEvents.GET_USERS, (users: User[]) => {
      setAllUsers([...users]);
    });
  }, [allUsers]);

  useEffect(() => {
    return () => {
      dispatch(logout());
      socket.disconnect();
      socket.off();
    };
  }, []);

  const { register, watch } = useForm<SearchData>({ defaultValues });
  const searchValue = watch();
  const handleSearch = () => {
    const filteredUsers = onlineUsers.filter((user) =>
      user.username.toLowerCase().includes(searchValue.text)
    );
    if (filteredUsers.length < 1) {
      setInfo('User with this username is not online');
    }
    setOnlineUsers(filteredUsers);
  };

  useEffect(() => {
    if (allUsers.length < 2) {
      setInfo('No users currently online');
    } else {
      setInfo('');
    }
    setOnlineUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (searchValue.text.length > 0) {
      handleSearch();
    } else {
      setOnlineUsers(allUsers);
    }
  }, [searchValue.text]);

  return (
    <>
      <div className={classes.Container}>
        <div className={classes.SideBarContent}>
          {loggedUser && (
            <section className={classes.Header}>
              <div className={classes.Avatar}>
                <UserStatus user={loggedUser} />
              </div>
              <h2>Chats</h2>
            </section>
          )}
          <div className={classes.SearchBar}>
            <Input id={'text'} register={register} placeholder={'Search'} />
          </div>
          <div className={classes.OnlineUsers}>
            {onlineUsers.length > 0 ? (
              <>
                {onlineUsers.map(
                  (user) =>
                    loggedUser?.username !== user.username && (
                      <OnlineUser
                        key={v4()}
                        user={user}
                        onClick={() => dispatch(pickReceiver(user))}
                      />
                    )
                )}
              </>
            ) : (
              <section>
                <h2 className={classes.Info}>{info}</h2>
              </section>
            )}
          </div>
        </div>

        <section className={classes.Logout}>
          <Button label={'Logout'} onClick={handleLogout} animation />
        </section>
      </div>
    </>
  );
};

export default SidebarMenu;
