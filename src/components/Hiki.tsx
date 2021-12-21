import React from 'react';

import wahine from './img/wahine.svg';

const Hiki = () => {
  return (
    <div className="hiki">
      <div className="hiki__img">
        <img className="" src={wahine} alt="wahine" />
      </div>

      <h5 className="hiki__h5">Sarah Connors</h5>
      <h6 className="">Bayonne</h6>
      <h6 className="hiki__h6">Les Cavalliers</h6>
      <h6 className="hiki__tag">surf au large</h6>
    </div>
  );
};

export default Hiki;
