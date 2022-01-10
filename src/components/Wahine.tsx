import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import wahine from './img/wahine.svg';

type WahineProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
  profilePic: string;
  firstname: string;
  lastname: string;
  city: string;
  favoriteSpot: string;
  id_user: number;
};

const Wahine: FC<WahineProps> = ({
  setActiveModal,
  // profilePic,
  firstname,
  lastname,
  city,
  favoriteSpot,
  id_user,
}) => {
  return (
    <div
      role="presentation"
      className="wahine"
      style={{ cursor: 'pointer' }}
      onClick={() => setActiveModal('modalwahine')}
      key={id_user}>
      <div className="wahine__img">
        <img className="" /*src={profilePic}*/ src={wahine} alt="wahine" />
      </div>

      <h5 className="wahine__h5">
        {firstname} {lastname}
      </h5>
      <h6 className="">{city}</h6>
      <h6 className="wahine__h6">{favoriteSpot}</h6>
    </div>
  );
};

export default Wahine;
