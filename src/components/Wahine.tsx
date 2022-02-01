import React, { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import wahineImg from '../../img/wahine.svg';
import IUser from '../interfaces/IUser';

type Props = IUser & { setActiveModal: Dispatch<SetStateAction<string>> };

const Wahine: FC<Props> = ({
  setActiveModal,
  firstname,
  lastname,
  city,
  favorite_spot,
  id_user,
  profile_pic,
}) => {
  return (
    <Link to={`/${id_user}`}>
      <div
        role="presentation"
        className="wahine"
        style={{ cursor: 'pointer' }}
        onClick={() => setActiveModal('wahine')}
        key={id_user}>
        <div className="wahine__img">
          <img
            className=""
            src={profile_pic !== 'null' && profile_pic !== null ? profile_pic : wahineImg}
            alt="wahine"
          />
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
