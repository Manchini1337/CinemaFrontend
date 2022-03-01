import { useState } from 'react';
import { OutlineButton } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import './register.scss';

const Register = ({ register, message }) => {
  let navigate = useNavigate();
  const [validation, setValidation] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.firstName.trim().length < 3 ||
      formData.firstName.trim().length > 20
    ) {
      setValidation('Niepoprawne imię');
      return;
    }

    if (
      formData.lastName.trim().length < 3 ||
      formData.lastName.trim().length > 20
    ) {
      setValidation('Niepoprawne nazwisko');
      return;
    }

    if (formData.phoneNumber.trim().length !== 9) {
      setValidation('Podaj 9 cyfrowy numer telefonu');
      return;
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        formData.email.trim()
      )
    ) {
      setValidation('Niepoprawny email');
      return;
    }

    if (
      formData.username.trim().length < 3 ||
      formData.username.trim().length > 20
    ) {
      setValidation('Niedozwolona nazwa użytkownika');
      return;
    }

    if (formData.password.trim().length < 7) {
      setValidation('Wybierz silniejsze hasło');
      return;
    }

    register(formData);
    setTimeout(function () {
      navigate('/login');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className='register-form'>
      <div className='form-inner'>
        <h2>Zarejestruj się</h2>
        {message !== '' ? <div className='success'>{message}</div> : ''}
        {validation !== '' ? <div className='error'>{validation}</div> : ''}

        <div className='form-group'>
          <label htmlFor='firstname'>Imię:</label>
          <input
            type='text'
            name='firstname'
            id='firstname'
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
              setValidation('');
            }}
            value={formData.firstName}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Nazwisko:</label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
              setValidation('');
            }}
            value={formData.lastName}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Numer telefonu:</label>
          <input
            type='text'
            name='phonenumber'
            id='phonenumber'
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
              setValidation('');
            }}
            value={formData.phoneNumber}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Email:</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setValidation('');
            }}
            value={formData.email}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Nazwa użytkownika:</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              setValidation('');
            }}
            value={formData.username}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Hasło:</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setValidation('');
            }}
            value={formData.password}
          />
        </div>
        <div className='btncenter'>
          <OutlineButton type='submit' className='button'>
            Zarejestruj
          </OutlineButton>
        </div>
      </div>
    </form>
  );
};

export default Register;
