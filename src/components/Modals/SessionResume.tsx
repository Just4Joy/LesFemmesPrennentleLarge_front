import React from 'react';

import Region from '../Home/Region';
import SurfSkill from '../SurfSkill';
import Weather from '../Weather';

const SessionResume = () => {
  return (
    <div>
      <div>
        <h2>Résumé de la session</h2>
      </div>
      <div>
        <SurfSkill />
        <Region name={'PACA'} color={'green'} />
      </div>
      <div>
        <h3>Session du (date) au (nom du spot) </h3>
        <p>Adresse de rdv</p>
        <p>Nombre de hikis</p>
      </div>
      <div>
        <h3>Conditions météo</h3>
      </div>
      <div>
        <Weather />
        <Weather />
        <Weather />
        <Weather />
      </div>
      <div>
        <button>Retour</button>
        <button>Publier</button>
      </div>
    </div>
  );
};

export default SessionResume;
