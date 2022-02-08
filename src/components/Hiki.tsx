import axios from 'axios';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import wahine from '../../img/wahine.svg';
import { error } from '../errors';
import ISurfStyle from '../interfaces/ISurfStyle';
import IUser from '../interfaces/IUser';

type Props = IUser & { setActiveModal: Dispatch<SetStateAction<string>> };

const Hiki: FC<Props> = ({
  setActiveModal,
  firstname,
  lastname,
  city,
  favorite_spot,
  id_user,
  id_surf_style,
  profile_pic,
}) => {
  const [surfStyles, setSurfStyles] = useState<ISurfStyle>();

  const getSurfStyle = async (idSurfStyle: number) => {
    const surfStyles = await axios.get<ISurfStyle>(
      `http://localhost:3000/api/surfstyles/${idSurfStyle}`,
    );
    setSurfStyles(surfStyles.data);
  };

  useEffect(() => {
    //GET Surfstyles
    try {
      getSurfStyle(id_surf_style);
    } catch (err) {
      error();
    }
  }, []);

  return (
    <Link to={`/session/${id_user}`}>
      <div
        role="presentation"
        className="hiki"
        style={{ cursor: 'pointer' }}
        onClick={() => setActiveModal('wahine2')}>
        <div className="hiki__img">
          <img
            className=""
            src={profile_pic !== 'null' && profile_pic !== null ? profile_pic : wahine}
            alt="wahine"
          />
        </div>

        <h5 className="hiki__h5">
          {firstname} {lastname}
        </h5>
        <h6 className="">{city}</h6>
        <h6 className="hiki__h6">{favorite_spot}</h6>
        <h6 className="hiki__tag">{surfStyles?.name_user}</h6>
      </div>
    </Link>
  );
};

export default Hiki;
