import React from 'react';

const CreateSession1 = () => {
  return (
    <div>
      <div>
        <h2>Créer une session</h2>
        <h2>1/2</h2>
      </div>
      <div>
        <form>
          <div>
            <input placeholder="nom de la session*"></input>
            <input placeholder="date de la session"></input>
            <input placeholder="spot*"></input>
            <input placeholder="région"></input>
          </div>
          <div>
            <input placeholder="adresse rdv*"></input>
            <input placeholder="nbr hiki max"></input>
            <input placeholder="type de session"></input>
            <input placeholder="covoiturage"></input>
          </div>
        </form>
      </div>
      <div>
        <button>suivant</button>
      </div>
    </div>
  );
};

export default CreateSession1;
