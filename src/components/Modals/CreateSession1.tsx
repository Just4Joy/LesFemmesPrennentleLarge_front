import axios from 'axios';
import dateFormat from 'dateformat';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import CurrentUserContext from '../contexts/CurrentUser';
import DatetimePicker from '../DatePicker';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};
const CreateSession1: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [surfStyles, setSurfStyles] = useState<ISurfStyle[]>([]);
  const [departements, setDepartements] = useState<IDepartment[]>([]);

  const [name, setName] = useState<ISession['name']>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [id_department, setId_department] = useState<ISession['id_department']>();
  const [address, setAddress] = useState<ISession['address']>();
  const [spot_name, setspot_name] = useState<ISession['spot_name']>();
  const [nb_hiki_max, setnb_hiki_max] = useState<ISession['nb_hiki_max']>();
  const [id_surf_style, setId_surf_style] = useState<ISession['id_surf_style']>();
  const [carpool, setCarpool] = useState<ISession['carpool']>();
  useEffect(() => {
    axios
      .get<IDepartment[]>('http://localhost:3000/api/departments')
      .then((result) => result.data)
      .then((data) => setDepartements(data));

    axios
      .get<ISurfStyle[]>('http://localhost:3000/api/surfstyle')
      .then((result) => result.data)
      .then((data) => setSurfStyles(data));
  }, []);

  const createSession = () => {
    console.log({
      name,
      date: dateFormat(selectedDate, 'yyyy-MM-dd hh:mm:ss'),
      spot_name,
      address,
      nb_hiki_max,
      id_department,
      id_surf_style,
      carpool: carpool,
      id_user: id,
    });
    axios.post<ISession>(
      'http://localhost:3000/api/sessions/',
      {
        name,
        date: dateFormat(selectedDate, 'yyyy-MM-dd hh:mm:ss'),
        spot_name,
        address,
        nb_hiki_max,
        id_department,
        id_surf_style,
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
                setId_department(parseInt(e.currentTarget.value, 10));
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

            <DatetimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <input
              className="create_session__form__inputs__input"
              placeholder="adresse rdv*"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setAddress(e.currentTarget.value)
              }></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="spot*"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setspot_name(e.currentTarget.value)
              }></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="nbr hiki max"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setnb_hiki_max(parseInt(e.currentTarget.value, 10))
              }></input>
          </div>
          <div className="create_session__form__type">
            <h4>Type de session</h4>
            <select
              onBlur={(e: React.FormEvent<HTMLSelectElement>) => {
                setId_surf_style(parseInt(e.currentTarget.value, 10));
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
        <hr />
        <div className="create_session__form__carpool">
          <h4>Co-voiturage ?</h4>
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
            createSession();
            setActiveModal('create_session2');
          }}>
          <h4>Suivant</h4>
        </button>
      </div>
    </div>
  );
};

export default CreateSession1;
