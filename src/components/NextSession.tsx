import React from 'react';

import { BsBoxArrowInUpRight } from 'react-icons/bs';

const Session = () => {
  return (
    <div className="session">
      <div className="session__button">
        <div className="session__button__region">Occitanie</div>
        <div className="session__button__surfstyle">Surf au large</div>
      </div>
      <div className=" session__infos">
        <div className="session__infos__spot">
          <h4 className="session__infos__spot__h4">Nom de la session</h4>
          <p className="session__infos__spot__p1"> Nom du spot </p>
          <p className="session__infos__spot__p2"> Adresse </p>
        </div>

        <div className="session__infos__rdv">
          <div className="session__infos__rdv__date">
            <p>Date </p>
            <p> Heure</p>
          </div>
          <div className="session__infos__rdv__covoit">
            <p>Covoiturage</p>
          </div>
        </div>
      </div>
      <hr className="session__hr" />
      <p className="session__details">
        Details <BsBoxArrowInUpRight />
      </p>
    </div>
  );
};

export default Session;
