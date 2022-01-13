import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateAccount: FC<Props> = ({ setActiveModal }) => {
  return (
    <div className="CreateAccount">
      <div className="CreateAccount__title">
        <p className="CreateAccount__title__p">Créer mon compte</p>
      </div>
      <div className="CreateAccount__form">
        <input className="CreateAccount__form__input" placeholder="nom*"></input>
        <input className="CreateAccount__form__input" placeholder="prénom*"></input>
        <input className="CreateAccount__form__input" placeholder="e-mail*"></input>

        <input className="CreateAccount__form__input" placeholder="n° de tel"></input>
        <input className="CreateAccount__form__input" placeholder="mot de passe*"></input>
        <input
          className="CreateAccount__form__input"
          placeholder="confirmer le mot de passe*"></input>
      </div>
      <div className="CreateAccount__button">
        <button
          className="CreateAccount__button__return"
          onClick={() => setActiveModal('connect')}>
          retour
        </button>
        <button
          className="CreateAccount__button__connect"
          onClick={() => setActiveModal('complete_profil1')}>
          s&apos;inscrire
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
