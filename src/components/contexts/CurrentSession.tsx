import React, { createContext, useState } from 'react';

type SessionContent = {
  idSessionCreated: number;
  setIdSession: React.Dispatch<React.SetStateAction<number>>;
};

type Props = { children: React.ReactNode };

const CurrentSessionContext = createContext<SessionContent>({
  idSessionCreated: 0,
  setIdSession: () => {},
});

export const CurrentSessionContextProvider: React.FC<Props> = ({ children }) => {
  const [idSessionCreated, setIdSession] = useState<number>(0);

  return (
    <CurrentSessionContext.Provider
      value={{
        idSessionCreated,
        setIdSession,
      }}>
      {children}
    </CurrentSessionContext.Provider>
  );
};

export default CurrentSessionContext;
