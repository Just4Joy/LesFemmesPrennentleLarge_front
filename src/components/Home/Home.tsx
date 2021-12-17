import React from 'react';
import Wahine from '../Wahine';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import BecomeWahine from './BecomeWahine';
import NavLink from 'react-router';

const Home = () => {
  return (
    <div className="home">
      {/* Section : Nos wahines */}
      <div className="home__wahines">
        <h3 className="">Nos Wahines</h3>
        <div className="home__component">
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
