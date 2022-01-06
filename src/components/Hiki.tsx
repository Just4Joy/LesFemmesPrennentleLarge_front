import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import wahine from './img/wahine.svg';

type HikiProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Hiki: FC<HikiProps> = ({ setActiveModal }) => {
  return (
    <div
      role="presentation"
      className="hiki"
      style={{ cursor: 'pointer' }}
      onClick={() => setActiveModal('modalwahine')}>
      <div className="hiki__img">
        <img className="" src={wahine} alt="wahine" />
      </div>

      <h5 className="hiki__h5">Sarah Connors</h5>
      <h6 className="">Bayonne</h6>
      <h6 className="hiki__h6">Les Cavalliers</h6>
      <h6 className="hiki__tag">surf au large</h6>
    </div>
  );
};

export default Hiki;
