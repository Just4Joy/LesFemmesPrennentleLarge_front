import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import SurfSkill from '../SurfSkill';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil2: FC<Props> = ({ setActiveModal }) => {
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
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
          <SurfSkill />
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
