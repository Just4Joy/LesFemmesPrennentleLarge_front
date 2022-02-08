import axios, { AxiosError } from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { error, sessionNotFound } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IWeather from '../../interfaces/IWeather';
import CurrentSessionContext from '../contexts/CurrentSession';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const SessionResume: FC<Props> = ({ setActiveModal }) => {
  const { idSessionCreated } = useContext(CurrentSessionContext);
  const [session, setSession] = useState<ISession>();
  const [surfStyle, setSurfStyle] = useState<ISurfStyle>();
  const [weathers, setWeathers] = useState<IWeather[]>([]);
  const [department, setDepartment] = useState<IDepartment>();

  const getSessionSurfStyle = async (session: ISession) => {
    const surfStyle = await axios.get<ISurfStyle>(
      `http://localhost:3000/api/surfstyles/${session.id_surf_style}`,
    );
    setSurfStyle(surfStyle.data);
  };

  const getSessionDepartment = async (session: ISession) => {
    const department = await axios.get<IDepartment>(
      `http://localhost:3000/api/departments/${session.id_department}`,
    );
    setDepartment(department.data);
  };

  const getSessionWeather = async (idCreatedSession: number) => {
    const weather = await axios.get<IWeather[]>(
      `http://localhost:3000/api/sessions/${idCreatedSession}/weather/`,
    );
    setWeathers(weather.data);
  };

  const getOneSession = async (idCreatedSession: number) => {
    const session = await axios.get<ISession>(
      `http://localhost:3000/api/sessions/${idCreatedSession}`,
    );
    setSession(session.data);
    getSessionSurfStyle(session.data);
    getSessionDepartment(session.data);
  };

  useEffect(() => {
    try {
      getOneSession(idSessionCreated);
      getSessionWeather(idSessionCreated);
    } catch (err) {
      error();
    }
  }, []);

  //DELETE the session
  const deleteSession = async () => {
    try {
      const deletedSession = await axios.delete<ISession>(
        `http://localhost:3000/api/sessions/${idSessionCreated}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (deletedSession.status !== 200) {
        throw new Error();
      } else {
        setActiveModal('');
      }
    } catch (err) {
      const er = err as AxiosError;
      if (er.response?.status === 404) {
        sessionNotFound();
      } else {
        error();
      }
    }
  };

  return (
    <div className="sessionResume">
      <div className="sessionResume__title">
        <h1>Résumé de la session</h1>
      </div>
      <div className="sessionResume__tags">
        <h6 className="sessionResume__tags__tag">
          {session && department && department.department_name}
        </h6>
        <h6 className="sessionResume__tags__tag">
          {session && surfStyle && surfStyle.name_session}
        </h6>
        <h6 className="sessionResume__tags__tag">
          {session && session.carpool ? 'Covoiturage possible' : 'Pas de covoiturage'}
        </h6>
      </div>
      <div className="sessionResume__session">
        <h3 className="sessionResume__session__title">
          Session du {session && session.nice_date} à {session && session.nice_time} au{' '}
          {session && session.spot_name}
        </h3>
        <div className="sessionResume__session__details">
          <div className="sessionResume__session__details__adress">
            <p>Adresse: {session && session.address}</p>
          </div>
          <div className="sessionResume__session__details__number">
            <p>Nombre de Hiki: {session && session.nb_hiki_max}</p>
          </div>
        </div>
      </div>
      <div className="sessionResume__title2">
        <h3>Conditions météo</h3>
      </div>
      <div className="sessionResume__weather">
        {weathers.map((weather, index) => {
          return (
            <h6 key={index} className="sessionResume__weather__buttons">
              {weather.name}
            </h6>
          );
        })}
      </div>
      <div className="sessionResume__button">
        <button
          className="sessionResume__button__validate"
          onClick={() => setActiveModal('session_published')}>
          <h4>Terminer</h4>
        </button>
        <Link to="/">
          <h4
            className="sessionResume__button__cancel"
            role="presentation"
            onClick={() => {
              deleteSession();
            }}>
            Annuler
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default SessionResume;
