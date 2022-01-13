import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { useParams } from 'react-router';

import wahineImg from '../../../img/wahine.svg';
import IDepartment from '../../interfaces/IDepartment';
import ISurfSkill from '../../interfaces/ISurfskills';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';

const ModalProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [departments, setDepartments] = useState<IDepartment>();
  const [surfStyles, setSurfStyles] = useState<ISurfStyle>();
  const [surfSkills, setSurfSkills] = useState<ISurfSkill>();

  useEffect(() => {
    axios
      .get<IUser>(`http://localhost:3000/api/users/${id}`)
      .then((result) => result.data)
      .then((data) => {
        setUser(data);
        // Get Departement
        axios
          .get<IDepartment>(
            `http://localhost:3000/api/departments/${data.id_departement}`,
          )
          .then((result) => result.data)
          .then((data) => setDepartments(data));
        // Get Surf Style
        axios
          .get<ISurfStyle>(`http://localhost:3000/api/surfstyle/${data.id_surf_style}`)
          .then((result) => result.data)
          .then((data) => setSurfStyles(data));
        //Get Surf Skill
        axios
          .get<ISurfSkill>(`http://localhost:3000/api/surfskill/${data.id_surf_skill}`)
          .then((result) => result.data)
          .then((data) => setSurfSkills(data));
      });
  }, []);

  return (
    <div className="modalwahine">
      {user && (
        <div className="modalProfile">
          <div className="modalProfile__row">
            <p>{user.wahine ? 'Wahine' : 'Hiki'}</p>
          </div>
          <div className="modalProfile__column">
            <div className="modalProfile__column__column1">
              <img src={wahineImg} alt="hiki" />
              <div className="modalProfile__column__column1__info">
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
                <h6>{user.city}</h6>
                <h6>{user.favorite_spot}</h6>
              </div>
            </div>

            <div className="modalProfile__column__column2">
              <div className="modalProfile__column__column2__row1">
                <div>
                  <p>{departments?.department_name}</p>
                  <p>{surfStyles?.name_user}</p>
                </div>
                <BsPencilSquare />
              </div>
              <div className="modalProfile__column__column2__row2">
                <h2>Skills</h2>
                <div className="modalProfile__column__column2__row2__wrap">
                  <p>{surfSkills?.name}</p>
                </div>
              </div>
              <div className="modalProfile__column__column2__row3">
                <div className="modalProfile__column__column2__row3__describe">
                  <h2>3 mots pour me décrire</h2>
                  <h6>{!user.desc ? 'Description...' : user.desc}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalProfile;
