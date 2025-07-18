import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import '../../css/HeaderMenu.css';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';
import portfolio from '../../assets/portfolio.png';
import logoags from '../../assets/logo_ags.webp'
import './../../css/Footer.css';

const FooterComponent = () => {
  return (
    <div className="footer-container">
      <div className="info-author">
        <img
          className="logo-menu"
          src={logo}
          alt="Logo de la empresa"
          title="SecondHand Hub. Donde todo tiene un nuevo hogar"
        />
        <div className="info-author-text">
          SecondHand Hub - Arenalsoft© Copyright 2025
          <div className='author-data'>
            <img
              src={logoags}
              alt="Logo diseñado del autor"
              className="logo-author"
            />
            <p className="footer-author-name">Developed by @alegarse</p>
          </div>
        </div>
      </div>
      <div className='footer-contact-btns'>
        <div>
          <button title="Pulse para visitar LinkedIn del autor">
            <a href="https://www.linkedin.com/in/alegarse/" target="_blank">
          <img src={linkedin} /></a>
          </button>
        </div>
        <div>
          <button title="Pulse para ver el github del autor">
            <a href="https://github.com/Alegarse" target="_blank">
            <img src={github} /></a>
          </button>
        </div>
        <div>
          <button title="Pulse para ver el portfolio del autor">
            <a href="https://portfolioags.arenalsoft.es/" target="_blank">
            <img src={portfolio} /></a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
