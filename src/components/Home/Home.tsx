import React from 'react';
import Wahine from '../Wahine';
import './Home.scss';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import BecomeWahine from './BecomeWahine';

const Home = () => {
  return (
    <div className="home-container">
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
