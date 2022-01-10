import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Registration: FC<Props> = ({ setActiveModal }) => {
  return (
    <div className="registration">
      <div className="registration__title">
        <h1>
          Tu souhaites t&apos;inscrire à la session du (date) avec (nom de la wahine)?
        </h1>
      </div>
      <div className="registration__covoit">
        <h4>co-voiturage ?</h4>
        <select name="covoit" id="covoit-select">
          <option value="">Choisie une option</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>
      </div>
      <div className="registration__buttons">
        <button
          onClick={() => setActiveModal('')}
          className="registration__buttons__return">
          <h4>retour</h4>
        </button>
        <button
          className="registration__buttons__signup"
          onClick={() => setActiveModal('registered')}>
          <h4>Oui, je m&apos;inscris</h4>
        </button>
      </div>
    </div>
  );
};

export default Registration;
