

import React from 'react';

import { BsBoxArrowInUpRight } from 'react-icons/bs';

import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import NextSession from '../NextSession';
import Region from './Region';

const Home = () => {
  return (
    <div className="home">


      {/*Section : Présentation*/}
      <div className="home__presentation">
        <p className="home__presentation__p1">
          {' '}
          Trouve des filles avec qui surfer <br />
          Des sessions entre surfeuses partout en France
        </p>

        <p className="home__presentation__p2">
          Pour tous les niveaux et organisés par des filles de coin qui maitrisent leur
          spot
        </p>
      </div>
      {/*Section : Les sessions de ta région*/}
      <div className="home__region">
        <p className="home__region__p1">Toutes les sessions de ta région</p>
        <div className="home__region__component">
          <Region />
          <Region />
          <Region />
          <Region />
          <Region />
          <Region />
          <Region />
        </div>
        <p className="home__region__p2">
          Toutes les régions <BsBoxArrowInUpRight />
        </p>
      </div>
    
      {/*Section : Les prochaines sessions*/}
      <div className="home__sessions">
        <p className="home__sessions__p1">Toutes les prochaines sessions</p>
        <div className="home__sessions__component">
          <NextSession />
          <NextSession />
          <NextSession />
        </div>
        <p className="home__sessions__p2">
          Toutes les sessions <BsBoxArrowInUpRight />
        </p>
      </div>
      {/* Section : Nos wahines */}
      <div className="home__wahine">
        <h1 className="home__wahine__p1">Nos Wahines</h1>
        <div className="home__wahine__component">

          <Wahine />
          <Wahine />
          <Wahine />
          <Wahine />
          <Wahine />
        </div>
        <h5 className="home__link">
          Toutes les wahines <BsBoxArrowInUpRight />
        </h5>
      </div>
      {/* Section : Devenir wahine */}
      <BecomeWahine />
    </div>
  );
};

export default Home;
