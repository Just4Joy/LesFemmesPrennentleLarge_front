import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import wahine from '../../img/wahine.svg';

type HikiProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
  profile_pic: string;
  firstname: string;
  lastname: string;
  city: string;
  favorite_spot: string;
  id_user: number;
  surf_style: string;
};

const Hiki: FC<HikiProps> = ({
  setActiveModal,
  // profile_pic,
  firstname,
  lastname,
  city,
  favorite_spot,
  surf_style,
}) => {
  return (
    <div
      role="presentation"
      className="hiki"
      style={{ cursor: 'pointer' }}
      onClick={() => setActiveModal('modalwahine')}>
      <div className="hiki__img">
        <img className="" /*src={profile_pic}*/ src={wahine} alt="wahine" />
      </div>

      <h5 className="hiki__h5">
        {firstname} {lastname}
      </h5>
      <h6 className="">{city}</h6>
      <h6 className="hiki__h6">{favorite_spot}s</h6>
      <h6 className="hiki__tag">{surf_style}</h6>
    </div>
  );
};

export default Hiki;
