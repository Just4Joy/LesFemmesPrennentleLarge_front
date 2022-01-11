import axios from 'axios';
import React, { FC, useContext } from 'react';
import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import MyProfile from './MyProfile';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Profile: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [profile, setProfile] = useState<IUser>();

  useEffect(() => {
    axios
      .get<IUser>(`http://localhost:3000/api/users/${id}`)
      .then((result) => result.data)
      .then((data) => setProfile(data));
  }, [id]);
  console.log(profile);

  return (
    <div className="profile">
      <div className="profile__goBack">
        <NavLink to="/">
          <BiArrowBack size="2rem" />
          <h1>Mon profil</h1>
        </NavLink>
      </div>
      {profile && <MyProfile {...profile} setActiveModal={setActiveModal} />}
    </div>
  );
};

export default Profile;
