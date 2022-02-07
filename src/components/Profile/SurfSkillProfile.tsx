import React, { FC } from 'react';

import ISurfSkill from '../../interfaces/ISurfskill';

type Props = ISurfSkill;
const SurfSkillProfile: FC<Props> = ({ ...surfSkill }) => {
  return (
    <div className="surfskillprofile">
      <p>{surfSkill.name}</p>
    </div>
  );
};

export default SurfSkillProfile;
