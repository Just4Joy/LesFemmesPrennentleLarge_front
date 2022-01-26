import axios from 'axios';
import React from 'react';

import { BiArrowBack } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import MyProfile from './MyProfile';

const Profile = () => {


  return (
    <div className="profile">
      <div className="profile__goBack">
        <NavLink to="/">
          <BiArrowBack size="2rem" />
          <h1>Mon profil</h1>
        </NavLink>
      </div>
      {<MyProfile />}
    </div>
  );
};

export default Profile;
