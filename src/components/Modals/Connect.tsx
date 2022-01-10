import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUser';
import IUser from '../interfaces/IUser';

type ConnectProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};
const Connect: FC<ConnectProps> = ({ setActiveModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate: NavigateFunction = useNavigate();

  const { setId, setAdmin, setFirstname } = useContext(CurrentUserContext);

  function redirectHome() {
    navigate('/');
  }

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post<IUser>(
        'http://localhost:3000/api/login',
        { email, password },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((response) => response.data)
      .then((data) => {
        setErrorMessage('');
        setId(data.id);
        setFirstname(data.firstname);
        setAdmin(data.admin === 1);
        redirectHome();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrorMessage('Email ou mot de passe incorrect');
        } else {
          setErrorMessage(err);
        }
      });
  };

  return (
    <div className="connect">
      <div>
        <div className="connect__title">
          <h2 className="connect__title__h2">Se connecter</h2>
        </div>
        <div>
          <form
            className="connect__form"
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
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              value={password}
            />
            <p>mot de passe oublié?</p>
          </form>
        </div>
        <div className="connect__button">
          <button
            className="connect__button__create"
            onClick={() => setActiveModal('creationcompte')}>
            Créer un compte
          </button>
          <button className="connect__button__connect" type="submit" value="Login">
            Se connecter
          </button>
          {errorMessage && <span>{errorMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default Connect;
