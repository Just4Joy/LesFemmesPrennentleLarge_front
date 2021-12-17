import React from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const Session = () => {
  return (
    <div className="session">
      <div className="session__button">
        <h6 className="session__button__region">Occitanie</h6>
        <h6 className="session__button__surfstyle">Surf au large</h6>
      </div>
      <div className=" session__infos">
        <div className="session__infos__spot">
          <h4 className="session__infos__spot__h4">Nom de la session</h4>
          <h6 className="session__infos__spot__h6"> Nom du spot </h6>
          <h6 className="session__infos__spot__adress"> Adresse </h6>
        </div>

        <div className="session__infos__rdv">
          <div className="session__infos__rdv__date">
            <p className="session__infos__rdv__date__p">15/01/2022</p>
            <p>17h15</p>
          </div>
          <div className="session__infos__rdv__covoit">
            <p>
              Covoiturage <BsFillPatchCheckFill color="#1f8387" />
            </p>
          </div>
        </div>
      </div>
      <hr className="session__hr" />
      <h5 className="session__details">
        Details <BsBoxArrowInUpRight />
      </h5>
    </div>
  );
};

export default Session;
