import React, { useState, useEffect } from 'react';
import './orderform.scss';
import { OutlineButton } from '../button/Button';
import api from '../../utils/api/axios.interceptor';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ user, order }) => {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userId: null,
    eventId: null,
    seatId: null,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (user.username) {
      setDetails({
        ...details,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        userId: user.id,
      });
    }
  }, [details.eventId]);

  useEffect(() => {
    setDetails({
      ...details,
      eventId: order.eventId,
      seatId: order.selectedSeats,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = api.post('/orders', {
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        email: details.email,
        userId: user.id ? user.id : null,
        eventId: order.eventId,
        seatId: order.selectedSeats,
      });
      if (response) {
        console.log('udalo sie, zrob redirect');
        navigate('/');
      }
    } catch (err) {
      setError('Wystąpił błąd, spróbuj ponownie');
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-inner'>
        {error !== '' ? <div className='error'>{error}</div> : ''}
        <div className='form-group'>
          <label htmlFor='firstname'>Imię:</label>
          <input
            type='text'
            name='firstname'
            id='firstname'
            onChange={(e) =>
              setDetails({ ...details, firstName: e.target.value })
            }
            value={details.firstName}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Nazwisko:</label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            onChange={(e) =>
              setDetails({ ...details, lastName: e.target.value })
            }
            value={details.lastName}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Email:</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Numer telefonu:</label>
          <input
            type='text'
            name='phonenumber'
            id='phonenumber'
            onChange={(e) =>
              setDetails({ ...details, phoneNumber: e.target.value })
            }
            value={details.phoneNumber}
          />
        </div>

        <div className='btncenter'>
          <OutlineButton type='submit' className='button'>
            Edytuj
          </OutlineButton>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
