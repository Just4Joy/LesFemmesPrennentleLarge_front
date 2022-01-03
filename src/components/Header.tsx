import React, { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import LFPLL from './img/LFPLL.svg';

type HeaderProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Header: FC<HeaderProps> = ({ setActiveModal }) => {
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
          <NavLink to="/login" onClick={() => setActiveModal('connect')}>
            Se connecter
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
