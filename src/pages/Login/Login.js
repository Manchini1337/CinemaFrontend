import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/login/LoginForm';
import './login.scss';
import api from '../../utils/api/axios.interceptor';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userslice';
import { useNavigate } from 'react-router-dom';

const path = '/users';

const Login = () => {
  let navigate = useNavigate();
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const login = async (details) => {
    try {
      const response = await api.post(`${path}/login`, {
        username: details.username,
        password: details.password,
      });

      const userData = response.data;
      if (userData) {
        dispatch(userActions.setUserData(userData));
        navigate('/user');
      }
    } catch (error) {
      setError('Wystąpił błąd, spróbuj ponownie.');
    }
  };

  return (
    <div className='loginsection mt-9'>
      <LoginForm login={login} error={error} />
    </div>
  );
};

export default Login;
