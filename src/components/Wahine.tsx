import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import wahine from './img/wahine.svg';

type WahineProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Wahine: FC<WahineProps> = ({ setActiveModal }) => {
  return (
    <div
      role="presentation"
      className="wahine"
      onClick={() => setActiveModal('modalwahine')}>
      <div className="wahine__img">
        <img className="" src={wahine} alt="wahine" />
      </div>

      <h5 className="wahine__h5">Sarah Connors</h5>
      <h6 className="">Bayonne</h6>
      <h6 className="wahine__h6">Les Cavalliers</h6>
    </div>
  );
};

export default Wahine;
