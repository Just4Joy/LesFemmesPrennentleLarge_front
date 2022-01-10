import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import wahine from '../../img/wahine.svg';

type WahineProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
  profile_pic?: string; // ? parce que c'est optionnel
  firstname: string;
  lastname: string;
  city: string;
  favorite_spot: string;
  id_user: number;
};

const Wahine: FC<WahineProps> = ({
  setActiveModal,
  // profile_pic,
  firstname,
  lastname,
  city,
  favorite_spot,
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
        <img className="" /*src={profile_pic}*/ src={wahine} alt="wahine" />
      </div>

      <h5 className="wahine__h5">
        {firstname} {lastname}
      </h5>
      <h6 className="">{city}</h6>
      <h6 className="wahine__h6">{favorite_spot}</h6>
    </div>
  );
};

export default Wahine;
