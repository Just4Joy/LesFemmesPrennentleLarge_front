import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import IRegion from '../../interfaces/IRegion';
import ISurfStyle from '../../interfaces/ISurfStyle';
import DatetimePicker from '../DatePicker';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};
const CreateSession1: FC<Props> = ({ setActiveModal }) => {
  const [surfStyles, setSurfStyles] = useState<ISurfStyle[]>([]);
  const [regions, setRegions] = useState<IRegion[]>([]);
  useEffect(() => {
    axios
      .get<IRegion[]>('http://localhost:3000/api/regions')
      .then((result) => result.data)
      .then((data) => setRegions(data));

    axios
      .get<ISurfStyle[]>('http://localhost:3000/api/surfstyle')
      .then((result) => result.data)
      .then((data) => setSurfStyles(data));
  }, []);

  return (
    <div className="create_session">
      <div className="create_session__title">
        <h1>Créer une session</h1>
        <h1>1/2</h1>
      </div>
      <div className="create_session__form">
        <form>
          <div className="create_session__form__inputs">
            <input
              className="create_session__form__inputs__input"
              placeholder="nom de la session*"></input>
            <select
              name="region"
              id="region-select"
              className="create_session__form__inputs__input">
              <option value="">régions</option>
              {regions &&
                regions.map((region) => (
                  <option key={region.id_region} value={region.id_region}>
                    {region.region_name}
                  </option>
                ))}
            </select>

            <DatetimePicker />

            <input
              className="create_session__form__inputs__input"
              placeholder="adresse rdv*"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="spot*"></input>
            <input
              className="create_session__form__inputs__input"
              placeholder="nbr hiki max"></input>
          </div>
          <div className="create_session__form__type">
            <h4>Type de session</h4>
            <select>
              <option value="">type de session</option>
              {surfStyles &&
                surfStyles.map((surfStyle) => (
                  <option key={surfStyle.id_surf_style} value={surfStyle.id_surf_style}>
                    {surfStyle.name_session}
                  </option>
                ))}
            </select>
          </div>
        </form>
        <hr />
        <div className="create_session__form__carpool">
          <h4>Co-voiturage ?</h4>
          <select>
            <option value="">choisir une option</option>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </div>
      </div>
      <div className="create_session__button">
        <button
          className="create_session__button__next"
          onClick={() => setActiveModal('create_session2')}>
          <h4>Suivant</h4>
        </button>
      </div>
    </div>
  );
};

export default CreateSession1;
