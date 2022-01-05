import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type CreateSession2Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateSession2: FC<CreateSession2Props> = ({ setActiveModal }) => {
  return (
    <div className="create-session2">
      <div className="create-session2__title">
        <h1>Condition météos (optionnel)</h1>
        <h1>2/2</h1>
      </div>
      <div className="create-session2__paragraph">
        <p>
          Tu sais analyser les conditions météos via des sites, comme liens, liens ou
          liens?
        </p>
        <p>Donne des indications aux participantes de la session</p>
      </div>
      <div className="create-session2__inputs">
        <input placeholder="type de vagues"></input>
        <input placeholder="courants"></input>
        <input placeholder="puissance des vagues"></input>
        <input placeholder="temps"></input>
      </div>
      <div className="create-session2__buttons">
        <button
          className="create-session2__buttons__next"
          onClick={() => setActiveModal('recap')}>
          <h4>valider</h4>
        </button>
        <button
          className="create-session2__buttons__skip"
          onClick={() => setActiveModal('recap')}>
          <h3>skip</h3>
        </button>
      </div>
    </div>
  );
};

export default CreateSession2;
