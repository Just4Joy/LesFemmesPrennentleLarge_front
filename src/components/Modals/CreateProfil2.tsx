import React from 'react';

import SurfSkill from '../SurfSkill';

const CreateProfil2 = () => {
  return (
    <div className="CreateProfil2">
      <div className="CreateProfil2__titles">
        <h2>Compléter son profil (2/2)</h2>
        <h2>Skip</h2>
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
            <button>Valider mon profil</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateProfil2;
