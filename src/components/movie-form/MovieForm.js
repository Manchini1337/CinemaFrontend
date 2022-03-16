import React, { useState } from 'react';
import './movieform.scss';
import { OutlineButton } from '../button/Button';

const MovieForm = ({ addMovie, message, genres }) => {
  const [validation, setValidation] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trailerUrl: '',
    genreId: 1,
    poster: '',
    background: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim().length < 3 ||
      formData.description.trim().length < 3 ||
      formData.trailerUrl.trim().length < 3 ||
      formData.poster.trim().length < 3 ||
      formData.background.trim().length < 3
    ) {
      setValidation('Uzupełnij formularz poprawnymi danymi');
      return;
    }
    addMovie(formData);
  };
  return (
    <form onSubmit={handleSubmit} className='movie-form'>
      <div className='form-inner'>
        {message !== '' ? <div className='error'>{message}</div> : ''}
        {validation !== '' ? <div className='error'>{validation}</div> : ''}

        <div className='form-group'>
          <label htmlFor='name'>Tytuł</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setValidation('');
            }}
            value={formData.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Opis:</label>
          <input
            type='text'
            name='description'
            id='description'
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setValidation('');
            }}
            value={formData.description}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='trailerUrl'>Link do trailera YouTube:</label>
          <input
            type='text'
            name='trailerUrl'
            id='trailerUrl'
            onChange={(e) => {
              setFormData({ ...formData, trailerUrl: e.target.value });
              setValidation('');
            }}
            value={formData.trailerUrl}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='genreId'>Kategoria</label>
          <select
            className='selectclass'
            onChange={(e) => {
              setFormData({ ...formData, genreId: e.target.value });
              setValidation('');
            }}
          >
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='poster'>Link do plakatu:</label>
          <input
            type='text'
            name='poster'
            id='poster'
            onChange={(e) => {
              setFormData({ ...formData, poster: e.target.value });
              setValidation('');
            }}
            value={formData.poster}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='background'>Link do tła:</label>
          <input
            type='text'
            name='background'
            id='background'
            onChange={(e) => {
              setFormData({ ...formData, background: e.target.value });
              setValidation('');
            }}
            value={formData.background}
          />
        </div>
        <div className='btncenter'>
          <OutlineButton type='submit' className='button'>
            Dodaj film
          </OutlineButton>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
