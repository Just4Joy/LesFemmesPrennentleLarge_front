import React, { FC, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

import LFPLL from '../../img/LFPLL.svg';
import CurrentUserContext from './contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Header: FC<Props> = ({ setActiveModal }) => {
  const { id, logout, wahine } = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(false);
  return (
    <>
      <div className="header">
        {/* Logo */}
        <div className="header__logo">
          <NavLink to="/">
            <img
              role="presentation"
              onClick={() => setBurger(false)}
              className="Logo"
              src={LFPLL}
              alt="Logo"
            />
          </NavLink>
        </div>
        <div className="header__burger">
          <GiHamburgerMenu
            className="header__burger__logo"
            role="presentation"
            onClick={() => setBurger(!burger)}
          />
        </div>
        {/* Diff. Pages */}
        <ul className="header__list">
          {/* If logged in, myProfile is visible */}
          <li className="header__list__profile">
            {id === 0 ? '' : <NavLink to="/profile">Mon Profil</NavLink>}
          </li>
          {/* If logged in, MySessions is visible */}
          <li className="header__list__mysessions">
            {id === 0 ? '' : <NavLink to="/mySessions">Mes Sessions</NavLink>}
          </li>
          {/* Sessions */}
          <li className="header__list__session">
            <NavLink to="/sessions">Sessions</NavLink>
          </li>
          {/* If not logged in, LogIn is visible, else LogOut is */}
          <li className="header__list__connection">
            {id === 0 ? (
              <NavLink
                end
                to="/login"
                onClick={() => setActiveModal('connect')}
                className="header__list__connection__login">
                Se connecter
              </NavLink>
            ) : (
              <NavLink to="/">
                <span
                  className="header__list__connection__logout"
                  role="presentation"
                  onClick={() => logout()}>
                  Se déconnecter
                </span>
              </NavLink>
            )}
            {/* If the user connected is a wahine, create a session is visible, otherwise not */}
          </li>
          {wahine ? (
            <li className="header__list__create" style={{ textDecoration: 'underline' }}>
              <NavLink
                to="/createSession"
                onClick={() => setActiveModal('create_session1')}>
                Créer une session
              </NavLink>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className={burger ? 'header__links' : 'header__hidden'}>
        <ul className="header__links__list">
          {/* If logged in, myProfile is visible */}
          <li
            role="presentation"
            onClick={() => setBurger(false)}
            className={id === 0 ? 'hidden' : 'header__links__list__profile padding'}>
            {id === 0 ? '' : <NavLink to="/profile">Mon Profil</NavLink>}
          </li>
          {/* If logged in, MySessions is visible */}
          <li
            role="presentation"
            onClick={() => setBurger(false)}
            className={id === 0 ? 'hidden' : 'header__links__list__mysessions padding'}>
            {id === 0 ? '' : <NavLink to="/mySessions">Mes Sessions</NavLink>}
          </li>
          {/* Sessions */}
          <li
            role="presentation"
            onClick={() => setBurger(false)}
            className="header__links__list__session padding">
            <NavLink to="/sessions">Sessions</NavLink>
          </li>
          {/* If not logged in, LogIn is visible, else LogOut is */}
          <li
            role="presentation"
            onClick={() => setBurger(false)}
            className="header__links__list__connection padding">
            {id === 0 ? (
              <NavLink
                end
                to="/login"
                onClick={() => setActiveModal('connect')}
                className="header__links__list__connection__login">
                Se connecter
              </NavLink>
            ) : (
              <NavLink to="/">
                <span
                  className="header__links__list__connection__logout"
                  role="presentation"
                  onClick={() => logout()}>
                  Se déconnecter
                </span>
              </NavLink>
            )}
            {/* If the user connected is a wahine, create a session is visible, otherwise not */}
          </li>
          {wahine ? (
            <li
              role="presentation"
              onClick={() => setBurger(false)}
              className="header__links__list__create padding"
              style={{ textDecoration: 'underline' }}>
              <NavLink
                to="/createSession"
                onClick={() => setActiveModal('create_session1')}>
                Créer une session
              </NavLink>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
