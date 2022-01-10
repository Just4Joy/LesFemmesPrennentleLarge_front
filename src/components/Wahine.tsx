import React, { FC } from 'react';

import wahineImg from '../../img/wahine.svg';
import IUser from '../interfaces/IUser';

type Props = IUser;

const Wahine: FC<Props> = ({
  setActiveModal, // profile_pic,
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
      onClick={() => setActiveModal('wahine')}
      key={id_user}>
      <div className="wahine__img">
        <img className="" /*src={profile_pic}*/ src={wahineImg} alt="wahine" />
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
