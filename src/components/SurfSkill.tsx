import React, { FC, useState } from 'react';

import ISurfSkill from '../interfaces/ISurfSkill';

type Props = ISurfSkill;
const SurfSkill: FC<Props> = ({ name, add, id_surf_skill }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="surfskill">
      <button
        className={active ? 'surfskill__active' : 'surfskill__notactive'}
        type="button"
        onClick={() => {
          setActive(!active);
          add(id_surf_skill);
        }}>
        {name}
      </button>
    </div>
  );
};

export default SurfSkill;
