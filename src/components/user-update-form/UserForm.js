import React, { useEffect, useState } from 'react';
import './userform.scss';
import { OutlineButton } from '../button/Button';
import api from '../../utils/api/axios.interceptor';

const UserForm = ({ user, message }) => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

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
    try {
      const response = await api.put('/users', {
        id: user.id,
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        email: details.email,
        password: details.password,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-inner'>
        {message !== '' ? <div className='error'>{message}</div> : ''}
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

        <div className='form-group'>
          <label htmlFor='password'>Hasło:</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
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
