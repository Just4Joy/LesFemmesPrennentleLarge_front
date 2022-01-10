import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUser';
import IUser from '../../../interfaces/IUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Connect: FC<Props> = ({ setActiveModal }) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate: NavigateFunction = useNavigate();

  const { setId, setWahine, setFirstname } = useContext(CurrentUserContext);

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
        setId(data.id_user);
        setFirstname(data.firstname);
        setWahine(data.wahine === 1);
        redirectHome();
        setActiveModal('__hiddenModal');
      })
      .catch((err) => {
        console.log(err);
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
        {errorMessage && <h6 className="connect__errors">{errorMessage}</h6>}
      </div>
    </div>
  );
};

export default Connect;
