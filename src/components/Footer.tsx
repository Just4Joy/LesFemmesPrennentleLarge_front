import './Footer.scss';

import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import Logo from './img/logo.svg';

const Footer = () => {
  return (
    <div className="footer-container">
      <p className="footer-container-p">Des questions, contactez nous,</p>
      <p className="footer-container-email">lesfemmesprennentlelarge33@gmail.com</p>
      <div className="footer-container-row-1">
        <img src={Logo} alt="" />
        <div className="footer-container-row-1-nav">
          <ul className="footer-container-row-1-nav-list">
            <li>Pages</li>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/profil">Profil</NavLink>
            </li>
            <li>
              <NavLink to="/landing_page">Landing page</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-container-row-1-mentions">
          <ul className="footer-container-row-1-mentions-list">
            <li>Mentions</li>
            <li>
              <NavLink to="/legal_mentions">Mentions légales</NavLink>
            </li>
            <li>
              <NavLink to="/cgv">CGV</NavLink>
            </li>
            <li>
              <NavLink to="/cgu">CGU</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-container-row-1-newsletter">
          <NavLink to="newsletter">Newsletter</NavLink>
          <input type="text" />
          <button>S`&apos;`inscrire</button>
        </div>
      </div>
      <div className="footer-container-row-2">
        <div className="footer-container-row-2-socialIcon">
          <a href="">
            <AiFillInstagram size="2em" />
          </a>
          <a href="">
            <AiFillFacebook size="2em" />
          </a>
          <a href="">
            <AiFillLinkedin size="2em" />
          </a>
        </div>
        <p className="footer-container-row-2-email">lesfemmesprennentlelarge.com</p>
      </div>
    </div>
  );
};

export default Footer;
