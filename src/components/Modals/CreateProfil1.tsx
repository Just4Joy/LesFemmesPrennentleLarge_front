import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type CreateProfil1Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil1: FC<CreateProfil1Props> = ({ setActiveModal }) => {
  return (
    <div className="CreateProfil1">
      <div className="CreateProfil1_title">
        <h2 className="CreateProfil1_title_h2_1">Compléter son profil (1/2)</h2>
        <h2 className="CreateProfil1_title_h2_2">Skip</h2>
      </div>
      <div className="CreateProfil1_">
        <img alt="" />
        <div>
          <div>
            <p>Upload ta photo de profil</p>
          </div>
          <input placeholder="3 mots pour te décrire"></input>
          <div>
            <input placeholder="ville"></input>
            <input placeholder="région où tu surfes"></input>
          </div>
          <input placeholder="ton spot préféré"></input>
        </div>
        <div>
          <button onClick={() => setActiveModal('completeprofil2')}>suivant</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfil1;
