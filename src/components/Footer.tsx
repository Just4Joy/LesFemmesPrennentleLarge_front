import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

import Logo from '../../img/logo.svg';

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="footer__h4">Des questions, contactez nous,</h4>
      <h4 className="footer__h4">lesfemmesprennentlelarge33@gmail.com</h4>
      <div className="footer__row1">
        <img className="footer__row1__logo" src={Logo} alt="" />

        <ul className="footer__row1__nav">
          <li>Pages</li>
          <li>Home</li>
          <li>Search</li>
          <li>Profil</li>
          <li>Landing page</li>
        </ul>

        <ul className="footer__row1__mentions">
          <li>Mentions</li>
          <li>Mentions légales</li>
          <li>CGV</li>
          <li>CGU</li>
        </ul>
      </div>
      <div className="footer__row2">
        <div className="footer__row2__socialIcon">
          <AiFillInstagram size="2em" />

          <AiFillFacebook size="2em" />

          <AiFillLinkedin size="2em" />
        </div>
        <h4 className="footer__row2__email">lesfemmesprennentlelarge.com</h4>
      </div>
    </div>
  );
};

export default Footer;
