import axios from 'axios';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';

import ISurfSkill from '../../interfaces/ISurfskills';
import IUserhassurfskills from '../../interfaces/IUserHasSurfSkill';

type Props = IUserhassurfskills;
const SurfSkillProfile: FC<Props> = ({ id_surf_skill }) => {
  const [surfSkillName, setSurfSkillName] = useState<ISurfSkill>();

  useEffect(() => {
    //Get Surf SKills name
    axios
      .get<ISurfSkill>(`http://localhost:3000/api/surfskill/${id_surf_skill}`)
      .then((result) => result.data)
      .then((data) => setSurfSkillName(data));
  }, []);

  return (
    <div className="surfskillprofile">
      <p>{surfSkillName?.name}</p>
    </div>
  );
};

export default SurfSkillProfile;
