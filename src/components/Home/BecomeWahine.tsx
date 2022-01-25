import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import becomeWahine from '../../../img/become-wahine.svg';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const BecomeWahine: FC<Props> = ({ setActiveModal }) => {
  console.log(setActiveModal);
  return (
    <div className="becomeWahine">
      <h1 className="becomeWahine__h1">Envie d&apos;accompagner des surfeuses ?</h1>
      <h2 className="">Créer des sessions dans tes spots préférés</h2>
      <div className="becomeWahine__row">
        <button
          className="becomeWahine__btn"
          onClick={() => setActiveModal('modalWahine')}>
          Devenir wahine
        </button>
        <img className="" src={becomeWahine} alt="Become wahine" />
      </div>
    </div>
  );
};

export default BecomeWahine;
