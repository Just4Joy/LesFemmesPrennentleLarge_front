import axios, { AxiosError } from 'axios';
import React, { FC } from 'react';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { emailExist, error, errorValidation } from '../../errors';
import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateAccount: FC<Props> = ({ setActiveModal }) => {
  const { setId, setWahine, setFirstname } = useContext(CurrentUserContext);
  const [firstname, setfirstname] = useState<string>('');
  const [lastname, setlastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secondPassword, setSecondPassword] = useState<string>('');

  const createUserAndConnect = async () => {
    if (password === secondPassword && secondPassword.length !== 0) {
      try {
        const createdUser = await axios.post<IUser>(
          'http://localhost:3000/api/users/',
          {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            password: password,
            wahine: false,
          },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );

        const login = await axios.post<IUser>(
          'http://localhost:3000/api/login',
          { email: createdUser.data.email, password: password },
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
        setActiveModal('complete_profil1');
      } catch (err) {
        const er = err as AxiosError;
        if (er.response?.status === 422) {
          errorValidation();
        } else if (er.response?.status === 400) {
          emailExist();
        } else {
          error();
        }
      }
    } else {
      errorValidation();
    }
  };

  return (
    <div className="CreateAccount">
      <div className="CreateAccount__title">
        <h3 className="CreateAccount__title__p">Créer mon compte</h3>
      </div>
      <div className="CreateAccount__form">
        <input
          className="CreateAccount__form__input"
          placeholder="nom*"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setlastname(e.currentTarget.value)
          }></input>
        <input
          className="CreateAccount__form__input"
          placeholder="prénom*"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setfirstname(e.currentTarget.value)
          }></input>
        <input
          className="CreateAccount__form__input"
          placeholder="e-mail*"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }></input>

        <input
          className="CreateAccount__form__input"
          placeholder="n° de tel"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPhone(e.currentTarget.value)
          }></input>
        <input
          className="CreateAccount__form__input"
          placeholder="mot de passe*"
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }></input>
        <input
          className="CreateAccount__form__input"
          type="password"
          placeholder="confirmer le mot de passe*"
          required
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSecondPassword(e.currentTarget.value)
          }></input>
      </div>
      <div className="CreateAccount__button">
        <button
          className="CreateAccount__button__return"
          onClick={() => setActiveModal('connect')}>
          retour
        </button>
        <button
          className="CreateAccount__button__connect"
          onClick={() => {
            createUserAndConnect();
          }}>
          s&apos;inscrire
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
