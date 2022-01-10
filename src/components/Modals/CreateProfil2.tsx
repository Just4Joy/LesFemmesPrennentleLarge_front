import '../../style/_CreateProfil2.scss';

import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import SurfSkill from '../SurfSkill';

type CreateProfil2Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil2: FC<CreateProfil2Props> = ({ setActiveModal }) => {
  return (
    <div className="createProfil2">
      <div className="createProfil2__titles">
        <h2>Compléter son profil 2/2</h2>
        <h2>Skip</h2>
      </div>
      <div className="createProfil2__skills">
        <div className="createProfil2__skills__titre">
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
            className="createProfil2__button__valider"
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
