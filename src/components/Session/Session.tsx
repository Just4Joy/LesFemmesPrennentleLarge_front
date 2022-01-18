import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useLayoutEffect } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router';

import ISession from '../../interfaces/ISession';
import IUser from '../../interfaces/IUser';
import Hiki from '../Hiki';
import Wahine2 from '../Wahine2';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Session: FC<Props> = ({ setActiveModal }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const first: number = 0;
  const second: number = 5;
  const [users, setUsers] = useState<IUser[]>([]);

  let { id_session } = useParams();
  console.log(id_session);
  const [session, setSession] = useState<ISession>();
  const [subscribers, setSubscribers] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get<ISession>(`http://localhost:3000/api/session/${id_session}`)
      .then((result) => result.data)
      .then((data) => setSession(data));
    axios
      .get<IUser[]>('http://localhost:3000/api/users')
      .then((result) => result.data)
      .then((data) => setUsers(data));
    axios
      .get<IUser[]>(`http://localhost:3000/api/sessions/${id_session}/users`)
      .then((result) => result.data)
      .then((data) => setSubscribers(data));
  }, []);
  console.log(session);
  console.log(subscribers);
  return (
    <div className="onesession">
      <div className="session">
        <div className="session__details">
          <div className="session__details__title">
            <h1>Nom de la session</h1>
            <h6 className="session__details__title__region">Occitanie</h6>
          </div>
          <div className="session__details__infos">
            <h4>Date - heure - spot</h4>
            <h4 className="session__details__infos__adresse">Adresse</h4>
            <div className="session__details__infos__type">
              <h4>Type de session</h4>
              <h6 className="session__details__infos__type__button">
                session dans les mousses
              </h6>
            </div>
            <div className="session__details__infos__covoit">
              <h4>
                Co-voiturage <BsFillPatchCheckFill color="#1f8387" />
              </h4>
              <h6 className="session__details__infos__covoit__button">
                session dans les mousses
              </h6>
            </div>
          </div>
          <hr className="session__details__hr" />
          <div className="session__details__weather">
            <h4>Condition météo</h4>
            <div className="session__details__weather__buttons">
              <h6 className="session__details__weather__buttons__button1">
                très petites vagues
              </h6>
              <h6 className="session__details__weather__buttons__button1">
                peu de vent: océan calme
              </h6>
              <h6 className="session__details__weather__buttons__button2">
                du soleil et des nanas
              </h6>
            </div>
          </div>
        </div>
        <div className="session__organiser">
          <h4>Organisé par:</h4>
          {users &&
            users
              .filter((user) => user.id_user === 27 && user.wahine)
              .map((user) => {
                return (
                  <Wahine2 {...user} setActiveModal={setActiveModal} key={user.id_user} />
                );
              })}
        </div>
      </div>
      <button className="onesession__join" onClick={() => setActiveModal('registration')}>
        Rejoindre la session
      </button>
      <div className="onesession__group">
        <h3>Hikis de la session</h3>
        <div className="onesession__group__hikis">
          {users &&
            users
              .filter((user) => !user.wahine)
              .slice(first, second)
              .map((user) => {
                return (
                  <Hiki {...user} setActiveModal={setActiveModal} key={user.id_user} />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Session;
