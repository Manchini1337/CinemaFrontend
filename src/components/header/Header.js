import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import api from '../../utils/api/axios.interceptor';
import { userActions } from '../../store/userslice';

import './header.scss';
import logo from '../../assets/logo.png';

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let login = 'Zaloguj się';
  let userPath = '/login';
  if (user.username) {
    login = user.username;
    userPath = '/user';
  }
  console.log(login);

  const headerNav = [
    { display: 'Strona główna', path: '/' },
    { display: 'Harmonogram', path: '/schedule' },
    { display: login, path: userPath },
  ];

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  // const logout = async () => {
  //   dispatch(
  //     userActions.setUserData({
  //       firstName: '',
  //       lastName: '',
  //       phoneNumber: '',
  //       email: '',
  //       username: '',
  //     })
  //   );
  //   console.log(user);
  //   try {
  //     const response = await api.post('/users/logout');
  //     if (response) {
  //       return <Navigate to='/' />;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const logout = async () => {
    try {
      const response = await api.post('/users/logout');
      if (response) {
        dispatch(
          userActions.setUserData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            username: '',
          })
        );
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='logo'>
          <img src={logo} alt='' />
          <Link to='/'>Cinema</Link>
        </div>
        <ul className='header__nav'>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          <li>
            <FontAwesomeIcon icon={faShoppingCart} className='header__icon' />
          </li>
          {user.username && (
            <li>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                onClick={logout}
                className='header__icon'
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
