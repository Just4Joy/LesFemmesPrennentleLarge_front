import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import SurfSkill from '../SurfSkill';

type CreateProfil2Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil2: FC<CreateProfil2Props> = ({ setActiveModal }) => {
  return (
    <div className="CreateProfil2">
      <div className="CreateProfil2__titles">
        <h3>Compléter son profil 2/2</h3>
        <h3>Skip</h3>
      </div>
      <div className="CreateProfil__skills">
        <div className="CreateProfil__skills__titre">
          <h3> Choisis tes skills</h3>
        </div>
        <div className="CreateProfil__skills__tags">
          <SurfSkill />
        </div>
        <div className="CreateProfil__button">
          <div>
            <button onClick={() => setActiveModal('')}>
              <NavLink to="/profile"> Valider mon profil </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfil2;
