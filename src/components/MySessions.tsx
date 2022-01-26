import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';

import ISession from '../interfaces/ISession';
import CurrentUserContext from './contexts/CurrentUser';
import MySession from './MySession';

const MySessions = () => {
  const { id } = useContext(CurrentUserContext);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [firstNext, setFirstNext] = useState(0);
  const [secondNext, setSecondNext] = useState(10);

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
          sessions.slice(firstNext, secondNext).map((session, index) => {
            return <MySession key={index} {...session} />;
          })}
      </div>
      <div className="mysessions__buttons">
        {firstNext > 0 && (
          <BsArrowLeftSquareFill
            className="mysessions__buttons__left"
            onClick={() => {
              setFirstNext(firstNext - 10);
              setSecondNext(secondNext - 10);
            }}
          />
        )}
        {secondNext <= sessions.length && (
          <BsArrowRightSquareFill
            className="mysessions__buttons__right"
            onClick={() => {
              setFirstNext(firstNext + 10);
              setSecondNext(secondNext + 10);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MySessions;
