import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

import wahine from '../../../img/wahine.svg';

const ModalProfile = () => {
  return (
    <div className="modalwahine">
      <div className="modalProfile">
        <div className="modalProfile__row">
          <p>hiki</p>
        </div>
        <div className="modalProfile__column">
          <div className="modalProfile__column__column1">
            <img src={wahine} alt="hiki" />
            <div className="modalProfile__column__column1__info">
              <h2>Nom Prénom</h2>
              <h6>Ville</h6>
              <h6>Spot préféré</h6>
            </div>
          </div>

          <div className="modalProfile__column__column2">
            <div className="modalProfile__column__column2__row1">
              <div>
                <p>PACA</p>
                <p>skills</p>
              </div>
              <BsPencilSquare />
            </div>
            <div className="modalProfile__column__column2__row2">
              <h2>Skills</h2>
              <div className="modalProfile__column__column2__row2__wrap">
                <p>premier skillllllllllllllllls</p>
                <p>premier skillkkkkkkkkkkkkkkkkkkkkkkkkks</p>
                <p>premier skilllllllllllllllllls</p>
                <p>premier skillllllllllllllllls</p>
                <p>premier skillkkkkkkkkkkkkkkkkkkkkkkkkks</p>
                <p>premier skilllllllllllllllllls</p>
              </div>
            </div>
            <div className="modalProfile__column__column2__row3">
              <div className="modalProfile__column__column2__row3__describe">
                <h2>3 mots pour me décrire</h2>
                <h6>Description</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
