import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import IUser from '../../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import MyProfile from './MyProfile';

const Profile = () => {
  const { id } = useContext(CurrentUserContext);
  const [users, setUsers] = useState<IUser>();

  useEffect(() => {
    axios
      .get<IUser>(`http://localhost:3000/api/users/${id}`)
      .then((result) => result.data)
      .then((data) => setUsers(data));
    return () => {
      // @ts-ignore: Unreachable code error
      setUsers()
    }
  }, [id]);

  return (
    <div className="profile">
      <div className="profile__goBack">
        <NavLink to="/">
          <BiArrowBack size="2rem" />
          <h1>Mon profil</h1>
        </NavLink>
      </div>
      {users && <MyProfile />}
    </div>
  );
};

export default Profile;
