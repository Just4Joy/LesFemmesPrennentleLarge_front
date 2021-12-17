import React from 'react';
import wahine from './img/wahine.svg';

const Wahine = () => {
  return (
    <div className="wahines">
      <div className="wahines__img">
        <img className="" src={wahine} alt="wahine" />
      </div>

      <h5 className="wahines__h5">Sarah Connors</h5>
      <h6 className="">Bayonne</h6>
      <h6 className="wahines__h6">Les Cavalliers</h6>
    </div>
  );
};

export default Wahine;
