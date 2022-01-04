import React from 'react';

const CreateProfil1 = () => {
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
          <button>suivant</button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfil1;
