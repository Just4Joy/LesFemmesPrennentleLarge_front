import React from 'react';

const Registration = () => {
  return (
    <div className="registration">
      <div className="">
        <h2>Tu souhaites t'inscrire à la session du (date) avec (nom de la wahine)?</h2>
      </div>
      <div>
        <label>co-voiturage ?</label>
        <input type="select" placeholder="choisir une option"></input>
      </div>
      <div>
        <button>retour</button>
        <button>Oui, je m'inscris</button>
      </div>
    </div>
  );
};

export default Registration;
