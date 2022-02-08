import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import wahineImg from '../../../img/wahine.svg';
import { error } from '../../errors';
import IDepartment from '../../interfaces/IDepartment';
import ISurfSkill from '../../interfaces/ISurfSkill';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import SurfSkillProfile from '../Profile/SurfSkillProfile';

const ModalProfile = () => {
  // Id of the user in params
  const { id } = useParams();

  const [user, setUser] = useState<IUser>();
  const [department, setDepartment] = useState<IDepartment>();
  const [surfStyle, setSurfStyle] = useState<ISurfStyle>();
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);

  const getDepartment = async (user: IUser) => {
    const department = await axios.get<IDepartment>(
      `http://localhost:3000/api/departments/${user.id_department}`,
    );
    setDepartment(department.data);
  };

  const getSurfStyle = async (user: IUser) => {
    const surfStyle = await axios.get<ISurfStyle>(
      `http://localhost:3000/api/surfstyles/${user.id_surf_style}`,
    );
    setSurfStyle(surfStyle.data);
  };

  const getSurfSkills = async (user: IUser) => {
    const surfSkills = await axios.get<ISurfSkill[]>(
      `http://localhost:3000/api/users/${user.id_user}/surfskills`,
    );
    setSurfSkills(surfSkills.data);
  };

  const getUser = async (idUser: string | undefined) => {
    const user = await axios.get<IUser>(
      `http://localhost:3000/api/users/${idUser}?display=all`,
    );
    setUser(user.data);
    getDepartment(user.data);
    getSurfStyle(user.data);
    getSurfSkills(user.data);
  };

  useEffect(() => {
    try {
      getUser(id);
    } catch (err) {
      error();
    }
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
              <img
                src={user && user.profile_pic !== 'null' ? user.profile_pic : wahineImg}
                alt="hiki"
              />
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
                  <p>{department?.department_name}</p>
                  <p>{surfStyle?.name_user}</p>
                </div>
              </div>
              <div className="modalProfile__column__column2__row2">
                <h2>Skills</h2>
                <div className="modalProfile__column__column2__row2__wrap">
                  {surfSkills &&
                    surfSkills.map((surfSkill) => {
                      return (
                        <SurfSkillProfile key={surfSkill.id_surf_skill} {...surfSkill} />
                      );
                    })}
                </div>
              </div>
              <div className="modalProfile__column__column2__row3">
                <div className="modalProfile__column__column2__row3__describe">
                  <h2>3 mots pour me décrire</h2>
                  <h6>{!user.description ? 'Description...' : user.description}</h6>
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
