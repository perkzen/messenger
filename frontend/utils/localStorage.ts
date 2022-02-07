import { User } from '../store/models/Auth';

const user_prefix = 'user';

const userStorage = {
  getUser: (): User => {
    if (typeof window !== 'undefined')
      return JSON.parse(
        window.localStorage.getItem(`${user_prefix}`) as string
      ) as User;
  },
  setUser: (user: User): void => {
    if (typeof window !== 'undefined')
      window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user));
  },
  clearUser: (): void => {
    if (typeof window !== 'undefined')
      window.localStorage.removeItem(`${user_prefix}`);
  },
};

export default userStorage;
