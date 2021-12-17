import React from 'react';
import Region from '../Home/Region';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import './Session.scss';

const Session = () => {
  return (
    <div className="session-container">
      <div className="session-button">
        <Region />
        <Region />
      </div>
      <div className=" session-infos">
        <h1 className="session-h1">Nom de la session</h1>
        <p> Nom du spot </p>
        <p> Adresse </p>
        <p>Date et Heure</p>
      </div>

      <p className="session-details-p">
        Details <BsBoxArrowInUpRight />
      </p>
    </div>
  );
};

export default Session;
