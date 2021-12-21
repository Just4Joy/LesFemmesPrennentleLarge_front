import React from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Session = () => {
  return (
    <div className="nextsession">
      <div className="nextsession__button">
        <h6 className="nextsession__button__region">Occitanie</h6>
        <h6 className="nextsession__button__surfstyle">Surf au large</h6>
      </div>
      <div className="nextsession__infos">
        <div className="nextsession__infos__spot">
          <h4 className="nextsession__infos__spot__h4">Nom de la session</h4>
          <h6 className="nextsession__infos__spot__h6"> Nom du spot </h6>
          <h6 className="nextsession__infos__spot__adress"> Adresse </h6>
        </div>

        <div className="nextsession__infos__rdv">
          <div className="nextsession__infos__rdv__date">
            <p className="nextsession__infos__rdv__date__p">15/01/2022</p>
            <p>17h15</p>
          </div>
          <div className="nextsession__infos__rdv__covoit">
            <p>
              Covoiturage <BsFillPatchCheckFill color="#1f8387" />
            </p>
          </div>
        </div>
      </div>
      <hr className="nextsession__hr" />
      <NavLink to="/session">
        <h5 className="nextsession__details">
          Details <BsBoxArrowInUpRight />
        </h5>
      </NavLink>
    </div>
  );
};

export default Session;
