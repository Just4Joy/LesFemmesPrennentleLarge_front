import React, { FC } from 'react';

import Region from '../Home/Region';
import SurfStyle from '../SurfStyle';
import Weather from '../Weather';
import { Dispatch, SetStateAction } from 'react';

type ResumeSessionProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const SessionResume: FC<ResumeSessionProps> = ({ setActiveModal }) => {
  return (
    <div className="sessionResume">
      <div className="sessionResume__title">
        <h2>Résumé de la session</h2>
      </div>
      <div className="sessionResume__tags">
        <SurfStyle />
        <SurfStyle />
        <Region />
      </div>
      <div className="sessionResume__session">
        <h3 className="sessionResume__session__title">
          Session du (date) au (nom du spot){' '}
        </h3>
        <p className="sessionResume__session__adress">Adresse de rdv</p>
        <p className="sessionResume__session__number">Nombre de hikis</p>
      </div>
      <div className="sessionResume__title2">
        <h3>Conditions météo</h3>
      </div>
      <div className="sessionResume__weather">
        <Weather />
        <Weather />
        <Weather />
        <Weather />
      </div>
      <div className="sessionResume__button">
        <h4 className="sessionResume__button__cancel">Annuler</h4>
        <button
          className="sessionResume__button__validate"
          onClick={() => setActiveModal('session-publiée')}>
          Publier
        </button>
      </div>
    </div>
  );
};

export default SessionResume;
