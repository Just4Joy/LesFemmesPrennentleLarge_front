import React, { createContext, useState } from 'react';

type SessionContent = {
  id_sessionCreated: number;
  setId_session: React.Dispatch<React.SetStateAction<number>>;
};

type Props = { children: React.ReactNode };

const CurrentSessionContext = createContext<SessionContent>({
  id_sessionCreated: 0,
  setId_session: () => {},
});

export const CurrentSessionContextProvider: React.FC<Props> = ({ children }) => {
  const [id_sessionCreated, setId_session] = useState<number>(0);

  return (
    <CurrentSessionContext.Provider
      value={{
        id_sessionCreated,
        setId_session,
      }}>
      {children}
    </CurrentSessionContext.Provider>
  );
};

export default CurrentSessionContext;
