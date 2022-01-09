import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import '../../style/_CreateProfil1.scss';
import womansurfing from '../img/womansurfing.png';

type CreateProfil1Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const CreateProfil1: FC<CreateProfil1Props> = ({ setActiveModal }) => {
  return (
    <div className="createProfil1">
      <div className="createProfil1__title">
        <h2>Compléter son profil 1/2</h2>
        <h2>Skip</h2>
      </div>
      <form className="createProfil1__container">
        <img
          className="createProfil1__container__img createProfil1__container__fullRow"
          src={womansurfing}
          alt=""
        />

        <p className="createProfil1__container__upload ">Upload ta photo de profil</p>

        <textarea
          className="createProfil1__container__textarea"
          id="w3review"
          name="w3review"
          rows={4}
          placeholder="3 mots pour te décrire"
        />

        <input className="createProfil1__container__ville" placeholder="ville"></input>
        <select id="region-select" className="createProfil1__container__region">
          <option value="">régions où tu surfes</option>
          <option value="Occitanie">Occitanie</option>
          <option value="Nouvelle Acquitaine">Nouvelle Acquitaine</option>
        </select>

        <input
          className="createProfil1__container__spot"
          placeholder="ton spot préféré"></input>

        <button
          className="createProfil1__next createProfil1__container__fullRow"
          onClick={() => setActiveModal('completeprofil2')}>
          suivant
        </button>
      </form>
    </div>
  );
};

export default CreateProfil1;
