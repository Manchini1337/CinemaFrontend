import { useState } from 'react';
import { OutlineButton } from '../button/Button';
import './register.scss';

const Register = ({ register, message }) => {
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
    register(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-inner'>
        <h2>Zarejestruj się</h2>
        {message !== '' ? <div className='error'>{message}</div> : ''}

        <div className='form-group'>
          <label htmlFor='firstname'>Imię:</label>
          <input
            type='text'
            name='firstname'
            id='firstname'
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            value={formData.firstName}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastname'>Nazwisko:</label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            value={formData.lastName}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Numer telefonu:</label>
          <input
            type='text'
            name='phonenumber'
            id='phonenumber'
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            value={formData.phoneNumber}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Email:</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Nazwa użytkownika:</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            value={formData.username}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Hasło:</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
