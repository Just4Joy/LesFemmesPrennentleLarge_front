import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import ISession from '../interfaces/ISession';
import CurrentUserContext from './contexts/CurrentUser';
import MySession from './MySession';

const MySessions = () => {
  const { id } = useContext(CurrentUserContext);
  const [sessions, setSessions] = useState<ISession[]>([]);

  useEffect(() => {
    axios
      .get<ISession[]>(`http://localhost:3000/api/users/${id}/sessions`)
      .then((result) => result.data)
      .then((data) => setSessions(data));
  }, [id]);
  return (
    <div className="mysessions">
      <h1 className="mysessions__h1">Mes Sessions</h1>
      <div className="mysessions__sessions">
        {sessions &&
          sessions.map((session, index) => {
            return <MySession key={index} {...session} />;
          })}
      </div>
    </div>
  );
};

export default MySessions;
