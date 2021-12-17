import React from 'react';
import { NavLink } from 'react-router-dom';

import LFPLL from './img/LFPLL.svg';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="Logo" src={LFPLL} alt="Logo" />
      </div>
      <ul className="header__list">
        <li className="header__list__search">
          <NavLink to="/search">Search</NavLink>
        </li>
        <li className="second-one">
          <NavLink to="/sessions">Sessions</NavLink>
        </li>
        <li className="third-one">
          <NavLink to="/login">Se connecter</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
