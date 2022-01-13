import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import ISurfSkill from '../../interfaces/ISurfskills';
import SurfSkill from '../SurfSkill';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil2: FC<Props> = ({ setActiveModal }) => {
  const [surfSkills, setSurfSkills] = useState<ISurfSkill[]>([]);

  useEffect(() => {
    axios
      .get<ISurfSkill[]>('http://lfpll-back.herokuapp.com/api/surfskill')
      .then((result) => result.data)
      .then((data) => setSurfSkills(data));
  }, []);

  return (
    <div className="createProfil2">
      <div className="createProfil2__titles">
        <h2>Compléter son profil 2/2</h2>
        <h2>Skip</h2>
      </div>
      <div className="createProfil2__skills">
        <div className="createProfil2__skills__title">
          <p> Choisis tes skills</p>
        </div>
        <div className="createProfil2__skills__tags">
          {surfSkills &&
            surfSkills.map((surfSkill) => {
              return <SurfSkill {...surfSkill} key={surfSkill.id_surf_skill} />;
            })}
        </div>
        <div className="createProfil2__button">
          <NavLink
            className="createProfil2__button__validate"
            to="/profile"
            onClick={() => setActiveModal('')}>
            Valider mon profil
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CreateProfil2;
