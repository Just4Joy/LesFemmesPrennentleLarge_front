import React from 'react';

const CreateProfil1 = () => {
  return (
    <div>
      <div>
        <h2>Compléter son profil (1/2)</h2>
        <h2>Skip</h2>
      </div>
      <div>
        <img />
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
