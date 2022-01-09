import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';

import NextSession from '../NextSession';
import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import Region from './Region';

type HomeProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Home: FC<HomeProps> = ({ setActiveModal }) => {
  interface regionTypes {
    id_region: number;
    region_name: string;
    color: string;
  }

  interface sessionsTypes {
    id_session: number;
    name: string;
    date: string;
    spot_name: string;
    adress: string;
    nb_hiki_max: number;
    id_departement: number;
    id_surf_style: number;
    carpool: number;
    region_name: string;
    name_session: string;
  }

  const [regions, setRegions] = useState<regionTypes[]>([]);
  const [threeSessions, setThreeSessions] = useState<sessionsTypes[]>([]);

  useEffect(() => {
    axios
      .get('http://lfpll-back.herokuapp.com/api/regions')
      .then((result: any) => result.data)
      .then((data: any) => setRegions(data));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/sessions/?limit=3')
      .then((result: any) => result.data)
      .then((data: any) => setThreeSessions(data));
  }, []);

  return (
    <div className="home">
      {/*Section : Présentation*/}

      <div className="home__presentation">
        <h1 className="home__presentation__h1">
          {' '}
          Trouve des filles avec qui surfer <br />
          Des sessions entre surfeuses partout en France
        </h1>

        <h4 className="home__presentation__h4">
          Pour tous les niveaux et organisés par des filles du coin qui maitrisent leur
          spot
        </h4>
      </div>
      {/*Section : Les sessions de ta région*/}
      <div className="home__region">
        <h3 className="home__region__h3">Les sessions de ta région</h3>
        <div className="home__region__component">
          {regions &&
            regions.map((region) => {
              return (
                <Region
                  region_name={region.region_name}
                  color={region.color}
                  key={region.id_region}
                />
              );
            })}
        </div>
      </div>

      {/*Section : Les prochaines sessions*/}
      <div className="home__sessions">
        <h3 className="home__sessions__h3">Les prochaines sessions</h3>
        <div className="home__sessions__component">
          {threeSessions &&
            threeSessions.map((session) => {
              return (
                <NextSession
                  date={session.date}
                  adress={session.adress}
                  name={session.name}
                  spot_name={session.spot_name}
                  region_name={session.region_name}
                  name_session={session.name_session}
                  carpool={session.carpool}
                  key={session.id_session}
                />
              );
            })}
        </div>
        <h5 className="home__sessions__h5">
          Toutes les sessions <BsBoxArrowInUpRight />
        </h5>
      </div>

      {/* Section : Nos wahines */}
      <div className="home__wahines">
        <h3 className="home__wahines__h3">Nos Wahines</h3>
        <div className="home__wahines__component">
          <Wahine setActiveModal={setActiveModal} />
          <Wahine setActiveModal={setActiveModal} />
          <Wahine setActiveModal={setActiveModal} />
          <Wahine setActiveModal={setActiveModal} />
          <Wahine setActiveModal={setActiveModal} />
        </div>
        <h5 className="home__wahines__link">
          Toutes les wahines <BsBoxArrowInUpRight />
        </h5>
      </div>

      {/* Section : Devenir wahine */}
      <BecomeWahine />
    </div>
  );
};

export default Home;
