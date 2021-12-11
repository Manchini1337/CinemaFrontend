import { useState } from 'react';
import { OutlineButton } from '../button/Button';
import './loginform.scss';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ login, error }) => {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(details);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-inner'>
        <h2>Zaloguj się</h2>
        {error !== '' ? <div className='error'>{error}</div> : ''}
        <div className='form-group'>
          <label htmlFor='username'>Nazwa użytkownika:</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
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
        <OutlineButton type='submit' className='button'>
          Zaloguj
        </OutlineButton>
        <OutlineButton className='button' onClick={() => navigate('/register')}>
          Zarejestruj się
        </OutlineButton>
      </div>
    </form>
  );
};

export default LoginForm;
