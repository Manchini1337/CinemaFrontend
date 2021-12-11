import React, { useState, useEffect, useRef } from 'react';
import LoginForm from '../../components/login/LoginForm';
import api from '../../utils/api/axios.interceptor';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userslice';
import { Navigate } from 'react-router';
import OrderList from '../../components/orderlist/OrderList';
import UserForm from '../../components/user-update-form/UserForm';

import './loginpage.scss';

const path = '/users';

// <button onClick={logout}>Logout</button>

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState('');
  const firstUpdate = useRef(true);

  useEffect(() => {
    api
      .get('/orders')
      .then((res) => {
        setUserOrders(res.data);
        console.log(userOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const login = async (details) => {
    try {
      const response = await api.post(`${path}/login`, {
        username: details.username,
        password: details.password,
      });

      const userData = response.data;
      if (userData) {
        dispatch(userActions.setUserData(userData));
      }
    } catch (error) {
      setError('Wystąpił błąd, spróbuj ponownie.');
    }
  };

  const updateUser = async (details) => {
    try {
      const response = await api
        .put('/users', {
          id: user.id,
          firstName: details.firstName,
          lastName: details.lastName,
          phoneNumber: details.phoneNumber,
          email: details.email,
          password: details.password,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('zaaktualizowano');
          }
        });
    } catch (err) {}
  };
  return (
    <div className='container section userbox'>
      {user.email !== '' ? (
        <div className='contain'>
          <div className='box1'>
            <h2>
              Witaj, {user.username} {user.type}
            </h2>
            <UserForm user={user} update={updateUser} />
          </div>
          <div className='box2'>
            <h2>Historia zamówień {userOrders.firstName}</h2>
            <button onClick={logout}>Logout</button>
            <OrderList orders={userOrders} />
          </div>
        </div>
      ) : (
        <div className='center'>
          <LoginForm login={login} error={error} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
