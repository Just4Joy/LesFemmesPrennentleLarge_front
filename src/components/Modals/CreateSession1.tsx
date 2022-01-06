import '../../style/_CreateSession1.scss';

import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type CreateSession1Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateSession1: FC<CreateSession1Props> = ({ setActiveModal }) => {
  return (
    <div className="create_session">
      <div className="create_session__title">
        <h1>Créer une session</h1>
        <h1>1/2</h1>
      </div>
      <div className="create_session__form">
        <form>
          <div className="create_session__form__inputs">
            <input
              className="create_session__form__inputs__input"
              placeholder="nom de la session*"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="région"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="date de la session"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="adresse rdv*"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="spot*"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="nbr hiki max"></input>
          </div>
          <div className="create_session__form__type">
            <h4>Type de session</h4>
            <input placeholder="type de session"></input>
          </div>
          <div className="create_session__form__weather">
            <h4>Conditions météo</h4>
          </div>
        </form>
        <hr />
        <div className="create_session__form__covoit">
          <h4>Co-voiturage ?</h4>
          <input placeholder="covoiturage"></input>
        </div>
      </div>
      <div className="create_session__button">
        <button
          className="create_session__button__next"
          onClick={() => setActiveModal('create_session2')}>
          <h4>Suivant</h4>
        </button>
      </div>
    </div>
  );
};

export default CreateSession1;