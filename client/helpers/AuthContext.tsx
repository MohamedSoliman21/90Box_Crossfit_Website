// AuthContext.tsx

import axios from 'axios';
import React, { PropsWithChildren, createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface User {
  id: string;
  Name: string;
}

interface AuthContextData {
  user: User | null;
  accessToken: string;
  login: (Email: string, Password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  accessToken: '',
  login: () => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();

  const login = async (UserEmail: string, UserPassword: string) => {
    try {
      const Data = {Email: UserEmail, Password: UserPassword};
       await axios.post('http://localhost:4000/user/login', Data)
      .then((res) => {
        console.log(res.data)

        const user: User = { id: res.data.id, Name: res.data.Name};
        const Token = res.data.Token;
        setUser(user);
        setAccessToken(Token);
        Cookies.set('Name', user.Name);
        Cookies.set('token', Token);
        router.push("/admin");
      })
      console.log(user);

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setAccessToken('');
      Cookies.remove('token');
      Cookies.remove('Name');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
