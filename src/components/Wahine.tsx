import React, { FC } from 'react';

import { Link } from 'react-router-dom';


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

    <Link to={`/${id_user}`}>
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
    </Link>

  );
};

export default Wahine;
