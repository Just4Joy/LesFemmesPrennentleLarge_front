import React, { FC } from 'react';

type RegionProps = {
  name: string;
  color: string;
};

const Region: FC<RegionProps> = ({ name, color }) => {
  return (
    <div className="region">
      <button className="region__button" type="button" style={{ background: color }}>
        {name}
      </button>
    </div>
  );
};

export default Region;
