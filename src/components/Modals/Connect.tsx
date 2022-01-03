import React, { FC } from 'react';

type ConnectProps = {
  setActiveModal: (modalOpened: string) => void;
};
const Connect: FC<ConnectProps> = ({ setActiveModal }) => {
  return (
    <div className="connect">
      <div>
        <div className="connect__form">
          <h2 className="connect__form__h">Se connecter</h2>
          <form>
            <input placeholder="email" />
            <input placeholder="password" />
            <p>mot de passe oublié?</p>
          </form>
        </div>
        <div>
          <button onClick={() => setActiveModal('creationcompte')}>
            Créer un compte
          </button>
          <button>Se connecter</button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
