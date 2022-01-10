import React, { FC, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import LFPLL from './img/LFPLL.svg';
import CurrentUserContext from './contexts/CurrentUser';

type HeaderProps = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Header: FC<HeaderProps> = ({ setActiveModal }) => {
  const { id, logout, admin } = useContext(CurrentUserContext);

  return (
    <div className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img className="Logo" src={LFPLL} alt="Logo" />
        </NavLink>
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
          {id === 0 ? (
            <NavLink end to="/login" onClick={() => setActiveModal('connect')}>
              Se connecter
            </NavLink>
          ) : (
            <button className="logout" onClick={() => logout()}>
              Se déconnecter
            </button>
          )}
          {/* <NavLink to="/login" onClick={() => setActiveModal('connect')}>
            Se connecter
          </NavLink> */}
        </li>
        <li className="header__list__create" style={{ textDecoration: 'underline' }}>
          <NavLink to="/create_session" onClick={() => setActiveModal('create_session1')}>
            Créer une session
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
