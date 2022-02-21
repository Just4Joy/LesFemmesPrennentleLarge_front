import axios, { AxiosError } from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { error, errorValidation, unauthorized, userNotFound } from '../../errors';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const ModalWahine: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [user, setUser] = useState<IUser>();

  const getUser = async (idUser: number) => {
    const user = await axios.get<IUser>(
      `http://localhost:3000/api/users/${idUser}?display=all`,
    );
    setUser(user.data);
  };
  //GET User
  useEffect(() => {
    try {
      getUser(id);
    } catch (err) {
      error();
    }
  }, [id]);

  //PUT Wahine
  const updateWahineStatus = async () => {
    try {
      const updatedWahine = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        { wahine_request: 1 },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (updatedWahine.status !== 200) {
        throw new Error();
      } else {
        setActiveModal('wahineRegistrated')
        const mailer = await axios.get<IUser>(
          `http://localhost:3000/api/users/mail/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        ;
      }
    } catch (err) {
      const er = err as AxiosError;
      if (er.response?.status === 401) {
        unauthorized();
      } else if (er.response?.status === 422) {
        errorValidation();
      } else if (er.response?.status === 404) {
        userNotFound();
      } else {
        error();
      }
    }
  };

  return (
    <div className="modalWahine">
      <div className="modalWahine__resume">
        <div className="modalWahine__resume__img">
          <img
            className="modalWahine__resume__img__pic"
            src={user && user.profile_pic}
            alt="picProfil"
          />
        </div>
        <div className="modalWahine__resume__infos">
          <h2>
            {user && user.lastname} {user && user.firstname}
          </h2>
          <h6>{user && user.city}</h6>
          <h6>{user && user.favorite_spot}</h6>
        </div>
      </div>
      <div className="modalWahine__explication">
        <p className="modalWahine__explication__text">
          Devenir wahine c&apos;est te sentir capable de montrer ton spot à d&apos;autres
          surfeuses. Les wahines sont les seules à pouvoir publier des sessions.
          Attention, il faut que tu sois à l&apos;aise à l&apos;eau et aller &quot;au
          large&quot;.
        </p>
      </div>
      <div className="modalWahine__button">
        <button
          className="modalWahine__button__validate"
          onClick={() => {
            updateWahineStatus();
          }}>
          Devenir Wahine
        </button>
      </div>
    </div>
  );
};

export default ModalWahine;
