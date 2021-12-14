import React from 'react';
import './BecomeWahine.scss';
import becomeWahine from '../img/become-wahine.svg';

const BecomeWahine = () => {
  return (
    <div className="become-wahine-container">
      <h2 className="become-wahine-container-h2">Envie d'accompagner des surfeuses ?</h2>
      <h3 className="become-wahine-container-h3">
        Créer des sessions dans tes spots préférés
      </h3>
      <div className="become-wahine-container-row">
        <button className="become-wahine-container-row-btn">Devenir wahine</button>
        <img
          className="become-wahine-container-row-img"
          src={becomeWahine}
          alt="Become wahine"
        />
      </div>
    </div>
  );
};

export default BecomeWahine;
