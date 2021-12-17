
import React from 'react';


import becomeWahine from '../img/become-wahine.svg';

const BecomeWahine = () => {
  return (
    <div className="becomeWahine">
      <h1 className="becomeWahine__h1">Envie d'accompagner des surfeuses ?</h1>
      <h2 className="">Créer des sessions dans tes spots préférés</h2>
      <div className="becomeWahine__row">
        <button className="becomeWahine__btn">Devenir wahine</button>
        <img className="" src={becomeWahine} alt="Become wahine" />
      </div>
    </div>
  );
};

export default BecomeWahine;
