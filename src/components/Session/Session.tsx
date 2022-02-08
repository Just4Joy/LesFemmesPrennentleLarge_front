import axios, { AxiosError } from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useLayoutEffect } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router';

import { alreadySubscribe, error, notSubscribe } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import IWeather from '../../interfaces/IWeather';
import CurrentUserContext from '../contexts/CurrentUser';
import Hiki from '../Hiki';
import Wahine2 from '../Wahine2';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Session: FC<Props> = ({ setActiveModal }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const { id } = useContext(CurrentUserContext);
  const { idSession } = useParams();

  const [session, setSession] = useState<ISession>();
  const [subscribers, setSubscribers] = useState<IUser[]>([]);
  const [weathers, setWeathers] = useState<IWeather[]>([]);
  const [department, setDepartment] = useState<IDepartment>();
  const [surfStyle, setSurfStyle] = useState<ISurfStyle>();
  const [wahine, setWahine] = useState<IUser | undefined>();
  const [wantSubscribe, setWantSubscribe] = useState<boolean>(false);
  const [wantUnsubscribe, setWantUnsubscribe] = useState<boolean>(false);
  const [hasSubscribe, setHasSubscribe] = useState<boolean>(false);

  const CheckHasSubcribe = (subscribersList: IUser[]) => {
    const subscribe: IUser | undefined = subscribersList.find(
      (user) => user.id_user == id,
    );
    subscribe ? setHasSubscribe(true) : setHasSubscribe(false);
  };

  // First useEffect function
  const getSessionWahine = async (session: ISession) => {
    const wahine = await axios.get<IUser>(
      `http://localhost:3000/api/users/${session.id_user}?display=all`,
    );
    setWahine(wahine.data);
  };

  const getSessionDepartment = async (session: ISession) => {
    const department = await axios.get<IDepartment>(
      `http://localhost:3000/api/departments/${session.id_department}`,
    );
    setDepartment(department.data);
  };

  const getSessionSurfStyle = async (session: ISession) => {
    const SurfStyle = await axios.get<ISurfStyle>(
      `http://localhost:3000/api/surfstyles/${session.id_surf_style}`,
    );
    setSurfStyle(SurfStyle.data);
  };

  const getOneSession = async (idSession: string | undefined) => {
    const session = await axios.get<ISession>(
      `http://localhost:3000/api/sessions/${idSession}?display=all`,
    );
    setSession(session.data);
    getSessionWahine(session.data);
    getSessionDepartment(session.data);
    getSessionSurfStyle(session.data);
  };

  const getSuscribers = async (idSession: string | undefined) => {
    const subscribers = await axios.get<IUser[]>(
      `http://localhost:3000/api/sessions/${idSession}/users?display=all`,
    );
    setSubscribers(subscribers.data);
    CheckHasSubcribe(subscribers.data);
  };

  const getWeather = async (idSession: string | undefined) => {
    const weather = await axios.get<IWeather[]>(
      `http://localhost:3000/api/sessions/${idSession}/weather/`,
    );
    setWeathers(weather.data);
  };

  // Second useEffect function
  const createSubscribers = async (idSession: string | undefined, idUser: number) => {
    const createdSubscribers = await axios.post<IUser[]>(
      `http://localhost:3000/api/sessions/${idSession}/users/${idUser}`,
      { idSession, id },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    setSubscribers(createdSubscribers.data);
    CheckHasSubcribe(createdSubscribers.data);
  };

  const deleteSubscribers = async (idSession: string | undefined, idUser: number) => {
    const deletedSubscribers = await axios.delete<IUser[]>(
      `http://localhost:3000/api/sessions/${idSession}/users/${idUser}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    setSubscribers(deletedSubscribers.data);
    CheckHasSubcribe(deletedSubscribers.data);
  };

  // First UseEffect
  useEffect(() => {
    try {
      getOneSession(idSession);
      getSuscribers(idSession);
      getWeather(idSession);
    } catch (err) {
      error();
    }
  }, []);

  // Second useEffect: join/unsubscribe to the session & loading of the users subscribed
  useEffect(() => {
    if (wantSubscribe) {
      try {
        createSubscribers(idSession, id);
      } catch (err) {
        const er = err as AxiosError;
        if (er.response?.status === 422) {
          alreadySubscribe();
        } else {
          error();
        }
      }
    }
    if (wantUnsubscribe) {
      try {
        deleteSubscribers(idSession, id);
      } catch (err) {
        const er = err as AxiosError;
        if (er.response?.status === 404) {
          notSubscribe();
        } else {
          error();
        }
      }
    }
  }, [wantSubscribe, wantUnsubscribe]);

  return (
    <div className="onesession">
      <div className="session">
        <div className="session__details">
          <div className="session__details__title">
            <h1>{session?.name}</h1>
            <h6 className="session__details__title__region">
              {department?.department_name}
            </h6>
          </div>
          <div className="session__details__infos">
            <h4>
              {session?.nice_date} - {session?.nice_time} - {session?.spot_name}
            </h4>
            <h4 className="session__details__infos__adresse">{session?.address}</h4>
            <div className="session__details__infos__type">
              <h4>Type de session</h4>
              <h6 className="session__details__infos__type__button">
                {surfStyle?.name_session}
              </h6>
            </div>
            <div className="session__details__infos__hikimax">
              <h5 className="session__details__infos__hikimax__title">
                Nombre maximum de participantes : {session?.nb_hiki_max}
              </h5>
            </div>
            <div className="session__details__infos__covoit">
              <h4>
                Co-voiturage <BsFillPatchCheckFill color="#1f8387" />
              </h4>
              <h6 className="session__details__infos__covoit__button">
                {session?.carpool ? 'Oui' : 'Non'}
              </h6>
            </div>
          </div>
          <hr className="session__details__hr" />
          <div className="session__details__weather">
            <h4>Condition météo</h4>
            <div className="session__details__weather__buttons">
              {weathers.map((weather, index) => {
                return (
                  <h6 key={index} className="session__details__weather__buttons__button1">
                    {weather.name}
                  </h6>
                );
              })}
            </div>
          </div>
        </div>
        <div className="session__organiser">
          <h4>Organisé par:</h4>
          {wahine && (
            <Wahine2 {...wahine} setActiveModal={setActiveModal} key={wahine.id_user} />
          )}
        </div>
      </div>
      {wahine && id !== wahine.id_user ? (
        hasSubscribe && id > 0 ? (
          <button
            className="onesession__join"
            onClick={() => {
              setActiveModal('unsubscribe');
              setWantUnsubscribe(true);
              setWantSubscribe(false);
            }}>
            Se désinscrire
          </button>
        ) : session && subscribers.length < session?.nb_hiki_max ? (
          <button
            className="onesession__join"
            onClick={() => {
              if (id > 0) {
                setActiveModal('registered');
                setWantSubscribe(true);
                setWantUnsubscribe(false);
              } else {
                setActiveModal('connect');
              }
            }}>
            Rejoindre la session
          </button>
        ) : (
          ''
        )
      ) : (
        ''
      )}

      <div className="onesession__group">
        <h3>Hikis de la session</h3>
        <div className="onesession__group__hikis">
          {subscribers &&
            subscribers.map((user) => {
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
