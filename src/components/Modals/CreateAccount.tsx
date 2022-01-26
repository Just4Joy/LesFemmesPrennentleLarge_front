import axios from 'axios';
import React, { FC } from 'react';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateAccount: FC<Props> = ({ setActiveModal }) => {
  const { setId, setWahine, setFirstname } = useContext(CurrentUserContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  console.log(errorMessage);
  const [firstname, setfirstname] = useState<string>('');
  const [lastname, setlastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  console.log(password2);

  // Toast gestion d'erreur
  const errorValidation = () => toast.warn('Données incorrectes.');
  const emailExist = () => toast.warn('L&aposemail est déjà utilisé.');

  const createUserAndConnect = () => {
    axios
      .post<IUser>(
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
      )
      .then((response) => response.data)
      .then((data) => {
        return axios.post<IUser>(
          'http://localhost:3000/api/login',
          { email: data.email, password: password },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
      })
      .then((response) => response.data)
      .then((data) => {
        setId(data.id_user);
        setFirstname(data.firstname);
        setWahine(data.wahine === 1);
        setActiveModal('complete_profil1');
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422) {
          errorValidation();
        } else if (err.response.status === 400) {
          emailExist();
        } else {
          setErrorMessage(err);
        }
      });
  };
  return (
    <div className="CreateAccount">
      <ToastContainer position="top-center" />
      <div className="CreateAccount__title">
        <p className="CreateAccount__title__p">Créer mon compte</p>
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
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }></input>
        <input
          className="CreateAccount__form__input"
          placeholder="confirmer le mot de passe*"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword2(e.currentTarget.value)
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
