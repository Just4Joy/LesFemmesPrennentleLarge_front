import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';

type CreateSession2Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateSession2: FC<CreateSession2Props> = ({ setActiveModal }) => {
  return (
    <div>
      <div>
        <h2>Condition météos (optionnel)</h2>
        <h2>2/2</h2>
      </div>
      <div>
        <p>
          Tu sais analyser les conditions météos via des sites, comme liens, liens ou
          liens? Donne des indications aux participantes de la session.{' '}
        </p>
      </div>
      <div>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
      </div>
      <div>
        <button onClick={() => setActiveModal('recap')}>valider</button>
        <button onClick={() => setActiveModal('recap')}>skip</button>
      </div>
    </div>
  );
};

export default CreateSession2;
