import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type ConnectProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};
const Connect: FC<ConnectProps> = ({ setActiveModal }) => {
  return (
    <div className="connect">
      <div>
        <div className="connect__title">
          <h2 className="connect__title__h2">Se connecter</h2>
        </div>
        <div>
          <form className="connect__form">
            <input className="connect__form__input" placeholder="email" />
            <input className="connect__form__input" placeholder="password" />
            <p>mot de passe oublié?</p>
          </form>
        </div>
        <div className="connect__button">
          <button
            className="connect__button__create"
            onClick={() => setActiveModal('creationcompte')}>
            Créer un compte
          </button>
          <button className="connect__button__connect">Se connecter</button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
