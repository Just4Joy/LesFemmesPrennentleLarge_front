import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

import SurfStyle from '../SurfStyle';
import Weather from '../Weather';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const SessionResume: FC<Props> = ({ setActiveModal }) => {
  return (
    <div className="sessionResume">
      <div className="sessionResume__title">
        <h2>Résumé de la session</h2>
      </div>
      <div className="sessionResume__tags">
        <SurfStyle />
        <SurfStyle />
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
        <button
          className="sessionResume__button__validate"
          onClick={() => setActiveModal('session_published')}>
          <h4>Publier</h4>
        </button>
        <h4 className="sessionResume__button__cancel">Annuler</h4>
      </div>
    </div>
  );
};

export default SessionResume;
