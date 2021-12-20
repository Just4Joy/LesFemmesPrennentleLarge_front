import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

import MyProfile from './MyProfile';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__goBack">
        <BiArrowBack size="2rem" />
        <h1>Mon profil</h1>
      </div>

      <MyProfile />
    </div>
  );
};

export default Profile;
