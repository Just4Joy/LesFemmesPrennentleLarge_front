import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ISurfStyle from '../interfaces/ISurfStyle';
import wahine from '../../img/wahine.svg';
import IUser from '../interfaces/IUser';

type Props = IUser & { setActiveModal: Dispatch<SetStateAction<string>> };

const Hiki: FC<Props> = ({
  setActiveModal, // profile_pic,
  firstname,
  lastname,
  city,
  favorite_spot,
  id_user,
  id_surf_style,
}) => {
  const [surfStyles, setSurfStyles] = useState<ISurfStyle>();
  useEffect(() => {
    axios
      .get<ISurfStyle>(`http://localhost:3000/api/surfstyle/${id_surf_style}`)
      .then((result) => result.data)
      .then((data) => setSurfStyles(data));
  }, []);
  return (
    <Link to={`/${id_user}`}>
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
        <h6 className="hiki__tag">{surfStyles?.name_user}</h6>
      </div>
    </Link>
  );
};

export default Hiki;
