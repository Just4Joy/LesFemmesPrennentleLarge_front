import React from 'react';

const Registration = () => {
  return (
    <div className="registration">
      <div className="">
        <h2>
          Tu souhaites t&apos;inscrire à la session du (date) avec (nom de la wahine)?
        </h2>
      </div>
      <div>
        <p>co-voiturage ?</p>
        <input type="select" placeholder="choisir une option"></input>
      </div>
      <div>
        <button>retour</button>
        <button>Oui, je m&apos;inscris</button>
      </div>
    </div>
  );
};

export default Registration;
