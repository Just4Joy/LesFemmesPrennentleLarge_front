import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';

import { error } from '../errors';
import ISession from '../interfaces/ISession';
import CurrentUserContext from './contexts/CurrentUser';
import MySession from './MySession';

const MySessions = () => {
  const { id, wahine } = useContext(CurrentUserContext);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [firstNext, setFirstNext] = useState(0);
  const [secondNext, setSecondNext] = useState(10);
  const [participants, setParticipants] = useState<ISession[]>([]);

  const getMyCreatedSessions = async (idUser: number) => {
    const myCreatedSessions = await axios.get<ISession[]>(
      `http://localhost:3000/api/sessions?wahine=${idUser}`,
    );
    setSessions(myCreatedSessions.data);
  };

  const getMySessions = async (idUser: number) => {
    const mySessions = await axios.get<ISession[]>(
      `http://localhost:3000/api/users/${idUser}/sessions`,
    );
    setParticipants(mySessions.data);
  };

  useEffect(() => {
    try {
      getMyCreatedSessions(id);
      getMySessions(id);
    } catch (err) {
      error();
    }
  }, [id]);

  return (
    <div className="mysessions">
      <h1 className="mysessions__h1">Mes Sessions</h1>
      <div className={wahine ? 'mysessions__wahine' : 'mysessions__hidden'}>
        <h3 className="mysessions__wahine__h3">Créées</h3>
        <div className="mysessions__wahine__sessions">
          {sessions &&
            sessions.slice(firstNext, secondNext).map((session, index) => {
              return <MySession key={index} {...session} />;
            })}
        </div>
        <div className="mysessions__wahine__buttons">
          {firstNext > 0 && (
            <BsArrowLeftSquareFill
              className="mysessions__wahine__buttons__left"
              onClick={() => {
                setFirstNext(firstNext - 10);
                setSecondNext(secondNext - 10);
              }}
            />
          )}
          {secondNext <= sessions.length && (
            <BsArrowRightSquareFill
              className="mysessions__wahine__buttons__right"
              onClick={() => {
                setFirstNext(firstNext + 10);
                setSecondNext(secondNext + 10);
              }}
            />
          )}
        </div>
      </div>
      <div className="mysessions__hiki">
        <h3 className="mysessions__hiki__h3">Inscrites</h3>
        <div className="mysessions__hiki__sessions">
          {participants &&
            participants.slice(firstNext, secondNext).map((participant, index) => {
              return <MySession key={index} {...participant} />;
            })}
        </div>
        <div className="mysessions__hiki__buttons">
          {firstNext > 0 && (
            <BsArrowLeftSquareFill
              className="mysessions__hiki__buttons__left"
              onClick={() => {
                setFirstNext(firstNext - 10);
                setSecondNext(secondNext - 10);
              }}
            />
          )}
          {secondNext <= sessions.length && (
            <BsArrowRightSquareFill
              className="mysessions__hiki__buttons__right"
              onClick={() => {
                setFirstNext(firstNext + 10);
                setSecondNext(secondNext + 10);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
