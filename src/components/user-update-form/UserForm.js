import React, { useEffect, useState } from 'react';
import './userform.scss';
import { OutlineButton } from '../button/Button';
import api from '../../utils/api/axios.interceptor';

const UserForm = ({ user }) => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    setDetails({
      ...details,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      details.firstName.trim().length < 3 ||
      details.firstName.trim().length > 20
    ) {
      setUserMessage('Niepoprawne imię');
      return;
    }

    if (
      details.lastName.trim().length < 3 ||
      details.lastName.trim().length > 20
    ) {
      setUserMessage('Niepoprawne nazwisko');
      return;
    }

    if (details.phoneNumber.trim().length !== 9) {
      setUserMessage('Podaj 9 cyfrowy numer telefonu');
      return;
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        details.email.trim()
      )
    ) {
      setUserMessage('Niepoprawny email');
      return;
    }

    try {
      const response = await api.put('/users', {
        id: user.id,
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        email: details.email,
        password: details.password,
      });
    } catch (err) {
      setUserMessage('Coś poszło nie tak, spróbuj ponownie.');
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='user-form'>
      <div className='form-inner'>
        {userMessage !== '' ? <div className='error'>{userMessage}</div> : ''}
        <div className='form-group'>
          <label htmlFor='firstname'>Imię:</label>
          <input
            type='text'
            name='firstname'
            id='firstname'
            onChange={(e) => {
              setDetails({ ...details, firstName: e.target.value });
              setUserMessage('');
            }}
            value={details.firstName}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Nazwisko:</label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            onChange={(e) => {
              setDetails({ ...details, lastName: e.target.value });
              setUserMessage('');
            }}
            value={details.lastName}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Email:</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) => {
              setDetails({ ...details, email: e.target.value });
              setUserMessage('');
            }}
            value={details.email}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Numer telefonu:</label>
          <input
            type='text'
            name='phonenumber'
            id='phonenumber'
            onChange={(e) => {
              setDetails({ ...details, phoneNumber: e.target.value });
              setUserMessage('');
            }}
            value={details.phoneNumber}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Hasło:</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) => {
              setDetails({ ...details, password: e.target.value });
              setUserMessage('');
            }}
            value={details.password}
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

export default UserForm;
