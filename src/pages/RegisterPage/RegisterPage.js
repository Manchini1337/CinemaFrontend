import React, { useState } from 'react';
import Register from '../../components/register/Register';
import api from '../../utils/api/axios.interceptor';

import './registerpage.scss';

const RegisterPage = () => {
  const [message, setMessage] = useState('');

  const register = async (formData) => {
    try {
      const response = await api.post('/users', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 201) {
        setMessage('Konto zostało utworzone');
      }
    } catch (err) {
      setMessage('Nieprawidłowe dane.');
    }
  };

  return (
    <div className='registersection mt-9'>
      <Register register={register} message={message} />
    </div>
  );
};

export default RegisterPage;
