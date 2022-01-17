import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import ISurfSkill from '../../interfaces/ISurfskills';
import CurrentUserContext from '../contexts/CurrentUser';
import SurfSkill from '../SurfSkill';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil2: FC<Props> = ({ setActiveModal }) => {
  const { id } = useContext(CurrentUserContext);
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);
  const [activeSurfSkill, setActiveSurfSkill] = useState<ISurfSkill['id_surf_skill'][]>(
    [],
  );

  useEffect(() => {
    axios
      .get<ISurfSkill[]>('http://lfpll-back.herokuapp.com/api/surfskill')
      .then((result) => result.data)
      .then((data) => setSurfSkills(data));
  }, []);

  const add = (id: ISurfSkill['id_surf_skill']) => {
    const arr = activeSurfSkill;
    if (arr.find((el) => el === id)) {
      arr.splice(arr.indexOf(id), 1);
    } else arr.push(id);

    setActiveSurfSkill(arr);
  };

  const UpdateProfile = () => {
    Promise.all(
      activeSurfSkill.map(async (el) => {
        axios.post(
          `http://localhost:3000/api/userhassurfskills/${id}/${el}`,
          {},
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
      }),
    ).then((response) => console.log(response));
  };

  return (
    <div className="createProfil2">
      <div className="createProfil2__titles">
        <h2>Compléter son profil 2/2</h2>
        <NavLink to="/profile" onClick={() => setActiveModal('')}>
          Skip
        </NavLink>
      </div>
      <div className="createProfil2__skills">
        <div className="createProfil2__skills__title">
          <p> Choisis tes skills</p>
        </div>
        <div className="createProfil2__skills__tags">
          {surfSkills &&
            surfSkills.map((surfSkill) => {
              return (
                <SurfSkill
                  {...surfSkill}
                  key={surfSkill.id_surf_skill}
                  id_surf_skill={surfSkill.id_surf_skill}
                  add={add}
                />
              );
            })}
        </div>
        <div className="createProfil2__button">
          <NavLink
            className="createProfil2__button__validate"
            to="/profile"
            onClick={() => {
              UpdateProfile();
              setActiveModal('');
            }}>
            Valider mon profil
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CreateProfil2;
