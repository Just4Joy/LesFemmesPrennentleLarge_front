import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

import wahine from '../img/wahine.svg';

const MyProfile = () => {
  const [editProfil, setEditProfil] = useState<boolean>(false);
  const [editSkills, setEditSkills] = useState<boolean>(false);
  // interface BsPencilSquareTypes {
  //   name: string;
  //   size: string;
  //   icon: IconType;
  //   active: boolean;
  // }

  return (
    <div className="myProfile">
      <div className="myProfile__row">
        <p>hiki</p>
        <BsPencilSquare
          size="2rem"
          color="black"
          onClick={() => setEditProfil(!editProfil)}
        />
      </div>

      <div className="myProfile__column">
        <div className="myProfile__column__column1">
          <img src={wahine} alt="hiki" />
          <div className="myProfile__column__column1__info">
            <h2>Nom Prénom</h2>
            <h6>Ville</h6>
            <h6>Spot préféré</h6>
          </div>
        </div>

        <div className="myProfile__column__column2">
          <div className="myProfile__column__column2__row1">
            <div>
              <p>PACA</p>
              <p>skills</p>
            </div>
            <BsPencilSquare color="grey" onClick={() => setEditSkills(!editSkills)} />
          </div>
          <div className="myProfile__column__column2__row2">
            <h2>Skills</h2>
            <div className="myProfile__column__column2__row2__wrap">
              <p>premier skillllllllllllllllls</p>
              <p>premier skillkkkkkkkkkkkkkkkkkkkkkkkkks</p>
              <p>premier skilllllllllllllllllls</p>
              <p>premier skillllllllllllllllls</p>
              <p>premier skillkkkkkkkkkkkkkkkkkkkkkkkkks</p>
              <p>premier skilllllllllllllllllls</p>
            </div>
          </div>
          <div className="myProfile__column__column2__row3">
            <div className="myProfile__column__column2__row3__describe">
              <h2>3 mots pour me décrire</h2>
              <h6>Description</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
