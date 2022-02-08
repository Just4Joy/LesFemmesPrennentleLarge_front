import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import IRegion from '../../interfaces/IRegion';

type Props = IRegion;

const Region: FC<Props> = ({ region_name, color, id_region }) => {
  const idRegion = id_region;
  return (
    <div className="region">
      <Link to={'/sessions/' + idRegion}>
        <button className="region__button" type="button" style={{ background: color }}>
          {region_name}
        </button>
      </Link>
    </div>
  );
};

export default Region;
