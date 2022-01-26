import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

type UserContent = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  firstname: string;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  wahine: number;
  setWahine: React.Dispatch<React.SetStateAction<number>>;
  logout: () => void;
  sessionIdCreated: number;
  setSessionIdCreated: React.Dispatch<React.SetStateAction<number>>;
};

type Props = { children: React.ReactNode };

const CurrentUserContext = createContext<UserContent>({
  id: 0,
  setId: () => {},
  firstname: '',
  setFirstname: () => {},
  logout: () => {},
  wahine: 0,
  setWahine: () => {},
  sessionIdCreated: 0,
  setSessionIdCreated: () => {},
});

export const CurrentUserContextProvider: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState<number>(0);
  const [firstname, setFirstname] = useState<string>('');
  const [wahine, setWahine] = useState<number>(0);
  const [sessionIdCreated, setSessionIdCreated] = useState<number>(0);
  const removeCookie = useCookies(['user_token'])[2];

  const logout = (): void => {
    setId(0);
    setFirstname('');
    setWahine(0);
    setSessionIdCreated(0);
    removeCookie('user_token');
  };

  return (
    <CurrentUserContext.Provider
      value={{
        id,
        setId,
        firstname,
        setFirstname,
        logout,
        wahine,
        setWahine,
        sessionIdCreated,
        setSessionIdCreated,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
