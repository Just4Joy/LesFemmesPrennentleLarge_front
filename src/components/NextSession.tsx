import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BsBoxArrowInUpRight, BsFillPatchCheckFill } from 'react-icons/bs';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import { error } from '../errors';
import ISession from '../interfaces/ISession';
import IUser from '../interfaces/IUser';

type Props = ISession;

const NextSession: FC<Props> = ({
  address,
  name,
  spot_name,
  region_name,
  name_session,
  carpool,
  nice_date,
  nice_time,
  id_session,
  nb_hiki_max,
  id_user,
}) => {
  const [subscribers, setSubscribers] = useState<IUser[]>([]);
  const [wahine, setWahine] = useState<IUser>();

  const idSession = id_session;
  const getSubscribers = async (idSession: number) => {
    const subscribers = await axios.get<IUser[]>(
      `http://localhost:3000/api/sessions/${idSession}/users?display=all`,
    );
    setSubscribers(subscribers.data);
  };

  const getWahine = async (idUser: number) => {
    const wahine = await axios.get<IUser>(`http://localhost:3000/api/users/${idUser}`);
    setWahine(wahine.data);
  };

  useEffect(() => {
    try {
      getSubscribers(id_session);
      getWahine(id_user);
    } catch (err) {
      error();
    }
  }, []);

  return (
    <div className="nextsession">
      <div className="nextsession__button">
        <h6 className="nextsession__button__region">{region_name}</h6>
        <h6 className="nextsession__button__surfstyle">{name_session}</h6>
      </div>
      <div className="nextsession__infos">
        <div className="nextsession__infos__spot">
          <h4 className="nextsession__infos__spot__h4">{name}</h4>
          <h6 className="nextsession__infos__spot__h6"> {spot_name} </h6>
          <h6 className="nextsession__infos__spot__adress"> {address} </h6>
          <h6 className="nextsession__infos__spot__wahine">
            Organisée par {wahine && wahine.firstname} {wahine && wahine.lastname}
          </h6>
          {nb_hiki_max === subscribers.length ? (
            <div className="nextsession__infos__spot__full">
              <h6 className="nextsession__infos__spot__full__text">Session complète</h6>
              <IoMdCheckboxOutline
                className="nextsession__infos__spot__full__icon"
                color="#cb5f0e"
              />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="nextsession__infos__rdv">
          <div className="nextsession__infos__rdv__date">
            <p className="nextsession__infos__rdv__date__p">{nice_date}</p>
            <p>{nice_time}</p>
          </div>
          {carpool === 1 ? (
            <div className="nextsession__infos__rdv__covoit">
              <p className="nextsession__infos__rdv__covoit__text">Covoiturage</p>
              <BsFillPatchCheckFill
                className="nextsession__infos__rdv__covoit__icon"
                color="#1f8387"
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <hr className="nextsession__hr" />
      <NavLink to={`/session/${idSession}`}>
        <div className="nextsession__details">
          <h5 className="nextsession__details__text">Details</h5>
          <BsBoxArrowInUpRight className="nextsession__details__icon" />
        </div>
      </NavLink>
    </div>
  );
};

export default NextSession;
