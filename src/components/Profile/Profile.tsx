import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

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
