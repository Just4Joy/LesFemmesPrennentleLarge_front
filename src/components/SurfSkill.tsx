import React, { FC } from 'react';

import ISurfSkill from '../interfaces/ISurfskills';

type Props = ISurfSkill;
const SurfSkill: FC<Props> = ({ name }) => {
  return (
    <div className="surfskill">
      <button className="surfskill__button" type="button">
        {name}
      </button>
    </div>
  );
};

export default SurfSkill;
