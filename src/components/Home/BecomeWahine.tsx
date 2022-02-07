import React, { FC, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

import becomeWahine from '../../../img/become-wahine.svg';
import CurrentUserContext from '../contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const BecomeWahine: FC<Props> = ({ setActiveModal }) => {
  const { id, wahine } = useContext(CurrentUserContext);

  return (
    <div className="becomeWahine">
      <h1 className="becomeWahine__h1">Envie d&apos;accompagner des surfeuses ?</h1>
      <h2 className="becomeWahine__h2">Créer des sessions dans tes spots préférés</h2>
      <div className="becomeWahine__row">
        {id && wahine === 0 ? (
          <button
            className="becomeWahine__row__btn"
            onClick={() => setActiveModal('modalWahine')}>
            Devenir wahine
          </button>
        ) : (
          <button
            className="becomeWahine__row__btn"
            onClick={() => setActiveModal('connect')}>
            Devenir wahine
          </button>
        )}

        <img className="becomeWahine__row__logo" src={becomeWahine} alt="Become wahine" />
      </div>
    </div>
  );
};

export default BecomeWahine;
