import React, { FC, useContext } from 'react';
// import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import LFPLL from '../../img/LFPLL.svg';
import CurrentUserContext from './contexts/CurrentUser';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Header: FC<Props> = ({ setActiveModal }) => {
  const { id, logout, wahine } = useContext(CurrentUserContext);
  const [dropDown, setDropDown] = useState(false);
  // const ref = useRef();

  // useEffect(() => {
  //   const checkIfClickedOutside = (e: any) => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     // @ts-ignore: Unreachable code error
  //     if (dropDown && ref.current && !ref.current.contains(e.target)) {
  //       setDropDown(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', checkIfClickedOutside);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener('mousedown', checkIfClickedOutside);
  //   };
  // }, [dropDown]);

  return (
    <div className="header">
      <div className="header__logo">
        <NavLink to="/">
          <img className="Logo" src={LFPLL} alt="Logo" />
        </NavLink>
      </div>
      <ul className="header__list">
        <li className="header__list__profile">
          {id === 0 ? (
            ''
          ) : wahine ? (
            // <NavLink to="/profile">
            //   Profil
            //   <IoIosArrowDown />
            // </NavLink>
            <div
              className={
                dropDown
                  ? 'header__list__profile__dropdown2'
                  : 'header__list__profile__dropdown'
              }>
              <p
                className="header__list__profile__dropdown__drop"
                role="presentation"
                onClick={() => setDropDown(!dropDown)}>
                Profile
                {dropDown ? (
                  <IoIosArrowUp className="header__list__profile__dropdown__drop__arrow" />
                ) : (
                  <IoIosArrowDown className="header__list__profile__dropdown__drop__arrow" />
                )}
              </p>
              {dropDown ? (
                <div className="header__list__profile__dropdown__links">
                  <NavLink to="/profile">
                    <li
                      className="header__list__profile__dropdown__links__link"
                      role="presentation"
                      onClick={() => setDropDown(false)}>
                      Mon Profile
                    </li>
                  </NavLink>
                  <NavLink to="/my_sessions">
                    <li
                      className="header__list__profile__dropdown__links__link"
                      role="presentation"
                      onClick={() => setDropDown(false)}>
                      Mes Sessions
                    </li>
                  </NavLink>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <NavLink to="/profile">Mon Profile</NavLink>
          )}
        </li>
        <li className="header__list__session">
          <NavLink to="/sessions">Sessions</NavLink>
        </li>

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
        </li>
        {wahine ? (
          <li className="header__list__create" style={{ textDecoration: 'underline' }}>
            <NavLink
              to="/create_session"
              onClick={() => setActiveModal('create_session1')}>
              Créer une session
            </NavLink>
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};

export default Header;
