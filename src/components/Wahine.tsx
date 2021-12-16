import './Wahine.scss';

import React from 'react';

import wahine from './img/wahine.svg';

const Wahine = () => {
  return (
    <div className="wahine-container">
      <div className="wahine-container-img">
        <img className="wahine-container-img-1" src={wahine} alt="wahine" />
      </div>

      <h3 className="wahine-container-h3">Sarah Connors</h3>
      <h4 className="wahine-container-h4">Bayonne</h4>
      <p className="wahine-container-p">Les Cavalliers</p>
    </div>
  );
};

export default Wahine;
