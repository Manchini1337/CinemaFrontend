import React, { useState } from 'react';
import './eventform.scss';
import { OutlineButton } from '../button/Button';
import BasicDateTimePicker from '../datepicker/BasicDateTimePicker';

const EventForm = ({ message, addEvent, movies }) => {
  const [notification, setNotification] = useState('');
  const [movieId, setMovieId] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(movieId, startDate, endDate);
    setNotification('Dodano nowy seans.');
  };
  return (
    <form onSubmit={handleSubmit} className='event-form'>
      <div className='form-inner'>
        {message !== '' ? <div className='error'>{message}</div> : ''}
        {notification !== '' ? (
          <div className='success'>{notification}</div>
        ) : (
          ''
        )}

        <div className='form-group'>
          <label htmlFor='genreId'>Wybierz film</label>
          <select
            className='selectclass'
            onChange={(e) => {
              setMovieId(e.target.value);
              setNotification('');
            }}
          >
            {movies.map((movie) => (
              <option value={movie.id} key={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group--dates'>
          <BasicDateTimePicker
            date={startDate}
            setDate={setStartDate}
            label={'Godzina rozpoczęcia'}
          />

          <BasicDateTimePicker
            date={endDate}
            setDate={setEndDate}
            label={'Godzina zakończenia'}
          />
        </div>

        <div className='btncenter'>
          <OutlineButton type='submit' className='button'>
            Dodaj seans
          </OutlineButton>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
