import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__content container'>
        <div className='footer__content__logo'>
          <div className='logo'>
            <img src={logo} alt='' />
            <Link to='/'>© 2021 - Sebastian Mączyński </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
