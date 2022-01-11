import React, { useContext, FC } from 'react';
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUser';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

import MyProfile from './MyProfile';
import { useState } from 'react';

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
