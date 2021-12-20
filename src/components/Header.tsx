import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import LFPLL from './img/LFPLL.svg';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="Logo" src={LFPLL} alt="Logo" />
      </div>
      <ul className="header__list">
        <li className="header__list__profile">
          <NavLink to="/profile">
            Profil
            <IoIosArrowDown />
          </NavLink>
        </li>
        <li className="header__list__search">
          <NavLink to="/search">Search</NavLink>
        </li>
        <li className="header__list__session">
          <NavLink to="/sessions">Sessions</NavLink>
        </li>
        <li className="header__list__connection">
          <NavLink to="/login">Se connecter</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
