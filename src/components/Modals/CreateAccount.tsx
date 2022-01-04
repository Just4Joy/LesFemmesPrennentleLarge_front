import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type CreateAccountProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateAccount: FC<CreateAccountProps> = ({ setActiveModal }) => {
  return (
    <div className="CreateAccount">
      <div className="CreateAccount__title">
        <h2 className="CreateAccount__title__h2">Créer mon compte</h2>
      </div>
      <div className="CreateAccount__form">
        <form>
          <div className="CreateAccount__form__div1"></div>
          <input placeholder="nom*"></input>
          <input placeholder="e-mail*"></input>
          <input placeholder="mot de passe*"></input>
          <div className="CreateAccount__form__div2"></div>
          <input placeholder="prénom*"></input>
          <input placeholder="n° de tel"></input>
          <input placeholder="confirmer le mot de passe*"></input>
        </form>
      </div>
      <div className="CreateAccount__button">
        <button
          className="CreateAccount__button__retour"
          onClick={() => setActiveModal('connect')}>
          retour
        </button>
        <button
          className="CreateAccount__button__seconnecter"
          onClick={() => setActiveModal('completeprofil1')}>
          se connecter
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
