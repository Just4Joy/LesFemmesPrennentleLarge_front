import React, { FC } from 'react';

type RegionProps = {
  region_name: string;
  color: string;
};

const Region: FC<RegionProps> = ({ region_name, color }) => {
  return (
    <div className="region">
      <button className="region__button" type="button" style={{ background: color }}>
        {region_name}
      </button>
    </div>
  );
};

export default Region;
