import './Home.scss';

import React from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';

import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import Session from '../Session/Session';
import Region from './Region';

const Home = () => {
  return (
    <div className="home-container">
      {/*Section : Présentation*/}
      <div className="home-container-presentation">
        <p className="p1">
          {' '}
          Trouve des filles avec qui surfer <br />
          Des sessions entre surfeuses partout en France
        </p>

        <p className="p3">
          Pour tous les niveaux et organisés par des filles de coin qui maitrisent leur
          spot
        </p>
      </div>
      {/*Section : Les sessions de ta région*/}
      <div className="home-container-region-sessions">
        <p className="home-container-region-sessions-p1">
          Toutes les sessions de ta région
        </p>
        <div className="home-container-region-sessions-component">
          <Region />
          <Region />
          <Region />
          <Region />
          <Region />
          <Region />
          <Region />
        </div>
        <p className="home-container-region-sessions-p2">
          Toutes les régions <BsBoxArrowInUpRight />
        </p>
      </div>
      {/*Section : Les prochaines sessions*/}
      <div className="home-container-next-sessions">
        <p className="home-container-next-sessions-p1">
          Toutes les prochaines sessions :
        </p>
        <div className="home-container-next-sessions-component">
          <Session />
          <Session />
          <Session />
        </div>
        <p className="home-container-next-sessions-p2">
          Toutes les sessions <BsBoxArrowInUpRight />
        </p>
      </div>
      {/* Section : Nos wahines */}
      <div className="home-container-wahine">
        <h1 className="home-container-wahine-h1">Nos Wahines</h1>
        <div className="home-container-wahine-component">
          <Wahine />
          <Wahine />
          <Wahine />
          <Wahine />
          <Wahine />
        </div>
        <p className="home-container-wahine-p">
          Toutes les wahines <BsBoxArrowInUpRight />
        </p>
      </div>
      {/* Section : Devenir wahine */}
      <BecomeWahine />
    </div>
  );
};

export default Home;
