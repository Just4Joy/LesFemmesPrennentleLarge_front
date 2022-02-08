import axios, { AxiosError } from 'axios';
import React, { FC, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { error, errorData } from '../../errors';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Connect: FC<Props> = ({ setActiveModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate: NavigateFunction = useNavigate();

  const { setId, setWahine, setFirstname } = useContext(CurrentUserContext);

  function redirectHome(): void {
    navigate('/');
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const login = await axios.post<IUser>(
        'http://localhost:3000/api/login',
        { email, password },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setId(login.data.id_user);
      setFirstname(login.data.firstname);
      setWahine(login.data.wahine === 1 ? 1 : 0);
      redirectHome();
      setActiveModal('__hiddenModal');
    } catch (err) {
      const er = err as AxiosError;
      if (er.response?.status === 401) {
        errorData();
      } else {
        error();
      }
    }

    // .then((response) => response.data)
    // .then((data) => {
    //   setId(data.id_user);
    //   setFirstname(data.firstname);
    //   setWahine(data.wahine === 1 ? 1 : 0);
    //   redirectHome();
    //   setActiveModal('__hiddenModal');
    // })
    // .catch((err) => {
    //   if (err.response.status === 401) {
    //     errorData();
    //   } else {
    //     error();
    //   }
    // });
  };
  return (
    <div className="connect">
      <ToastContainer position="top-center" />
      <div>
        <div className="connect__title">
          <h2 className="connect__title__h2">Se connecter</h2>
        </div>
        <div>
          <form
            className="connect__form"
            id="connect-form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e)}>
            <input
              className="connect__form__input"
              placeholder="email"
              id="email"
              name="email"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              value={email}
            />
            <input
              className="connect__form__input"
              placeholder="password"
              id="password"
              name="password"
              type="password"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              value={password}
            />
            <h6>mot de passe oublié?</h6>
          </form>
        </div>
        <div className="connect__button">
          <button
            className="connect__button__create"
            onClick={() => setActiveModal('create_account')}>
            Créer un compte
          </button>
          <button
            className="connect__button__connect"
            form="connect-form"
            type="submit"
            value="Login">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
