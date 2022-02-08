import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { error } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import { convertDateToISO } from '../../utils/functions';
import CurrentSessionContext from '../contexts/CurrentSession';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};
const CreateSession1: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const { setIdSession } = useContext(CurrentSessionContext);
  const [surfStyles, setSurfStyles] = useState<ISurfStyle[]>([]);
  const [departements, setDepartements] = useState<IDepartment[]>([]);

  const [name, setName] = useState<ISession['name']>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [idDepartment, setIdDepartment] = useState<ISession['id_department']>();
  const [address, setAddress] = useState<ISession['address']>();
  const [spotName, setSpotName] = useState<ISession['spot_name']>();
  const [nbHikiMax, setNbHikiMax] = useState<ISession['nb_hiki_max']>();
  const [idSurfStyle, setIdSurfStyle] = useState<ISession['id_surf_style']>();
  const [carpool, setCarpool] = useState<ISession['carpool']>();

  const getAllDepartments = async () => {
    const allDepartments = await axios.get<IDepartment[]>(
      'http://localhost:3000/api/departments',
    );
    setDepartements(allDepartments.data);
  };

  const getAllSurfStyles = async () => {
    const allSurfStyles = await axios.get<ISurfStyle[]>(
      'http://localhost:3000/api/surfstyles',
    );
    setSurfStyles(allSurfStyles.data);
  };

  useEffect(() => {
    try {
      getAllDepartments();
      getAllSurfStyles();
    } catch (err) {
      error();
    }
  }, []);

  //POST Session
  const createSession = async (id: number) => {
    try {
      const createdSession = await axios.post<ISession>(
        'http://localhost:3000/api/sessions/',
        {
          name,
          date: selectedDate,
          spot_name: spotName,
          address,
          nb_hiki_max: nbHikiMax,
          id_department: idDepartment,
          id_surf_style: idSurfStyle,
          carpool,
          id_user: id,
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setIdSession(createdSession.data.id_session);
      setActiveModal('create_session2');
      if (createdSession.status !== 200) {
        throw new Error();
      }
    } catch (err) {
      error();
    }
  };

  return (
    <div className="create_session">
      <div className="create_session__title">
        <h1>Créer une session</h1>
        <h1>1/2</h1>
      </div>
      <div className="create_session__form">
        <form>
          <div className="create_session__form__inputs">
            <input
              className="create_session__form__inputs__input"
              placeholder="nom de la session*"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setName(e.currentTarget.value)
              }></input>

            <select
              name="region"
              id="region-select"
              className="create_session__form__inputs__input"
              onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
                setIdDepartment(parseInt(e.currentTarget.value, 10));
              }}>
              <option value="">Département</option>
              {departements &&
                departements.map((departement) => (
                  <option
                    key={departement.id_department}
                    value={departement.id_department}>
                    {departement.department_name}
                  </option>
                ))}
            </select>
            <input
              className="create_session__form__inputs__input"
              type="datetime-local"
              name="test"
              id="test"
              min={convertDateToISO(new Date(Date.now()))}
              onChange={(e: any) => setSelectedDate(e.target.value)}
            />
            <input
              className="create_session__form__inputs__input"
              placeholder="adresse rdv*"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setAddress(e.currentTarget.value)
              }
            />
            <input
              className="create_session__form__inputs__input"
              placeholder="spot*"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setSpotName(e.currentTarget.value)
              }
            />
            <input
              className="create_session__form__inputs__input"
              placeholder="nbr hiki max"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setNbHikiMax(parseInt(e.currentTarget.value, 10))
              }></input>
          </div>
          <div className="create_session__form__type">
            <h4 className="create_session__form__type__h4">Type de session</h4>
            <select
              onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
                setIdSurfStyle(parseInt(e.currentTarget.value, 10));
              }}>
              <option value="">type de session</option>
              {surfStyles &&
                surfStyles.map((surfStyle) => (
                  <option key={surfStyle.id_surf_style} value={surfStyle.id_surf_style}>
                    {surfStyle.name_session}
                  </option>
                ))}
            </select>
          </div>
        </form>
        <hr className="create_session__form__hr" />
        <div className="create_session__form__carpool">
          <h4 className="create_session__form__carpool__h4">Co-voiturage ?</h4>
          <select
            onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
              setCarpool(parseInt(e.currentTarget.value, 10));
            }}>
            <option value="">choisir une option</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>
      </div>
      <div className="create_session__button">
        <button
          className="create_session__button__next"
          onClick={() => {
            createSession(id);
          }}>
          <h4>Suivant</h4>
        </button>
      </div>
    </div>
  );
};

export default CreateSession1;
