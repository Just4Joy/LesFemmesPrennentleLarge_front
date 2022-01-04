import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';

import Hiki from '../Hiki';
import Wahine from '../Wahine';

type SessionProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Session: FC<SessionProps> = ({ setActiveModal }) => {
  return (
    <div className="onesession">
      <div className="session">
        <div className="session__details">
          <div className="session__details__title">
            <h1>Nom de la session</h1>
            <h6 className="session__details__title__region">Occitanie</h6>
          </div>
          <div className="session__details__infos">
            <h4>Date - heure - spot</h4>
            <h4 className="session__details__infos__adresse">Adresse</h4>
            <div className="session__details__infos__type">
              <h4>Type de session</h4>
              <h6 className="session__details__infos__type__button">
                session dans les mousses
              </h6>
            </div>
            <div className="session__details__infos__covoit">
              <h4>
                Co-voiturage <BsFillPatchCheckFill color="#1f8387" />
              </h4>
              <h6 className="session__details__infos__covoit__button">
                session dans les mousses
              </h6>
            </div>
          </div>
          <hr className="session__details__hr" />
          <div className="session__details__weather">
            <h4>Condition météo</h4>
            <div className="session__details__weather__buttons">
              <h6 className="session__details__weather__buttons__button1">
                très petites vagues
              </h6>
              <h6 className="session__details__weather__buttons__button1">
                peu de vent: océan calme
              </h6>
              <h6 className="session__details__weather__buttons__button2">
                du soleil et des nanas
              </h6>
            </div>
          </div>
        </div>
        <div className="session__organiser">
          <h4>Organisé par:</h4>
          <Wahine setActiveModal={setActiveModal} />
        </div>
      </div>
      <button className="onesession__join" onClick={() => setActiveModal('registration')}>
        Rejoindre la session
      </button>
      <div className="onesession__group">
        <h3>Hikis de la session</h3>
        <div className="onesession__group__hikis">
          <Hiki setActiveModal={setActiveModal} />
          <Hiki setActiveModal={setActiveModal} />
          <Hiki setActiveModal={setActiveModal} />
          <Hiki setActiveModal={setActiveModal} />
          <Hiki setActiveModal={setActiveModal} />
        </div>
      </div>
    </div>
  );
};

export default Session;
