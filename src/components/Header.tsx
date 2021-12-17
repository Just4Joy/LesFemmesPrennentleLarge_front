import React from 'react';
import './Header.scss';
import LFPLL from './img/LFPLl.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img className="Logo" src={LFPLL} alt="Logo" />
      </div>
      <div className="header-link">
        <ul>
          <li className="first-one">
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
    </div>
  );
};

export default Header;
