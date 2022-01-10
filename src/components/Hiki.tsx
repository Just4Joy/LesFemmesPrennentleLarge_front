import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import wahine from './img/wahine.svg';

type HikiProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
  profilePic: string;
  firstname: string;
  lastname: string;
  city: string;
  favoriteSpot: string;
  id_user: number;
  id_surf_style: number;
};

const Hiki: FC<HikiProps> = ({
  setActiveModal,
  // profilePic,
  firstname,
  lastname,
  city,
  favoriteSpot,
  id_surf_style,
}) => {
  return (
    <div
      role="presentation"
      className="hiki"
      style={{ cursor: 'pointer' }}
      onClick={() => setActiveModal('modalwahine')}>
      <div className="hiki__img">
        <img className="" /*src={profilePic}*/ src={wahine} alt="wahine" />
      </div>

      <h5 className="hiki__h5">
        {firstname} {lastname}
      </h5>
      <h6 className="">{city}</h6>
      <h6 className="hiki__h6">{favoriteSpot}s</h6>
      <h6 className="hiki__tag">
        {id_surf_style ? `Surf au large` : `surf dans les mousses`}
      </h6>
    </div>
  );
};

export default Hiki;
