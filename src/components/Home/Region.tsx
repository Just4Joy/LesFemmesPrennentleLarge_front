import React, { FC } from 'react';

import IRegion from '../../interfaces/IRegion';

type Props = IRegion;

const Region: FC<Props> = ({ region_name, color }) => {
  return (
    <div className="region">
      <button className="region__button" type="button" style={{ background: color }}>
        {region_name}
      </button>
    </div>
  );
};

export default Region;
