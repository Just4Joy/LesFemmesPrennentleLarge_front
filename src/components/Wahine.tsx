import React from 'react';

import wahine from './img/wahine.svg';

const Wahine = () => {
  return (
    <div className="wahine">
      <div className="wahine__img">
        <img className="" src={wahine} alt="wahine" />
      </div>

      <h5 className="wahine__h5">Sarah Connors</h5>
      <h6 className="">Bayonne</h6>
      <h6 className="wahine__h6">Les Cavalliers</h6>
    </div>
  );
};

export default Wahine;
