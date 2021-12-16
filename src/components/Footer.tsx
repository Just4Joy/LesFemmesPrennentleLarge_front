import React from 'react';
import './Footer.scss';
import Logo from './img/logo.svg';
import { AiFillLinkedin, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';

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
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Search</a>
            </li>
            <li>
              <a href="">Profil</a>
            </li>
            <li>
              <a href="">Landing page</a>
            </li>
          </ul>
        </div>
        <div className="footer-container-row-1-mentions">
          <ul className="footer-container-row-1-mentions-list">
            <li>Mentions</li>
            <li>
              <a href="">Mentions légales</a>
            </li>
            <li>
              <a href="">CGV</a>
            </li>
            <li>
              <a href="">CGU</a>
            </li>
          </ul>
        </div>
        <div className="footer-container-row-1-newsletter">
          <label htmlFor="">Newsletter</label>
          <input type="text" placeholder="E-mail" />
          <button>S'inscrire</button>
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
