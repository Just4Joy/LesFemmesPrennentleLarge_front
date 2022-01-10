import React, { FC } from 'react';

import wahine from '../../img/wahine.svg';
import IUser from '../interfaces/IUser';

type Props = IUser;

const Hiki: FC<Props> = ({
  setActiveModal, // profile_pic,
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
      onClick={() => setActiveModal('wahine')}>
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
