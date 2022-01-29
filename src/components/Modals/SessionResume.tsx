import axios from 'axios';
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
  const { id_sessionCreated } = useContext(CurrentSessionContext);
  const [session, setSession] = useState<ISession>();
  const [surfStyle, setSurfStyle] = useState<ISurfStyle>();
  const [weather, setWeather] = useState<IWeather[]>([]);
  const [department, setDepartment] = useState<IDepartment>();

  useEffect(() => {
    axios
      .get<ISession>(`http://localhost:3000/api/sessions/${id_sessionCreated}`)
      .then((result) => result.data)
      .then((data) => {
        setSession(data);
        axios
          .get<ISurfStyle>(`http://localhost:3000/api/surfstyles/${data.id_surf_style}`)
          .then((result) => result.data)
          .then((data) => setSurfStyle(data))
          .catch(() => {
            error();
          });
        axios
          .get<IDepartment>(`http://localhost:3000/api/departments/${data.id_department}`)
          .then((result) => result.data)
          .then((data) => setDepartment(data))
          .catch(() => {
            error();
          });
      })
      .catch(() => {
        error();
      });
    axios
      .get<IWeather[]>(`http://localhost:3000/api/sessions/${id_sessionCreated}/weather/`)
      .then((result) => result.data)
      .then((data) => setWeather(data))
      .catch(() => {
        error();
      });
  }, []);

  const deleteSession = () => {
    console.log(id_sessionCreated);
    axios
      .delete<ISession>(`http://localhost:3000/api/sessions/${id_sessionCreated}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        setActiveModal('');
      })
      .catch((err) => {
        if (err.response.status === 404) {
          sessionNotFound();
        } else {
          error();
        }
      });
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
        <p className="sessionResume__session__adress">
          Adresse: {session && session.address}
        </p>
        <p className="sessionResume__session__number">
          Nombre de Hiki: {session && session.nb_hiki_max}
        </p>
      </div>
      <div className="sessionResume__title2">
        <h3>Conditions météo</h3>
      </div>
      <div className="sessionResume__weather">
        {weather.map((weather, index) => {
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
