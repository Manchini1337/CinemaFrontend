import React, { useState } from 'react';
import './movieform.scss';
import { OutlineButton } from '../button/Button';

const MovieForm = ({ addMovie, message, genres }) => {
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
    addMovie(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-inner'>
        {message !== '' ? <div className='error'>{message}</div> : ''}

        <div className='form-group'>
          <label htmlFor='name'>Tytuł</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Opis:</label>
          <input
            type='text'
            name='description'
            id='description'
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='trailerUrl'>Link do trailera YouTube:</label>
          <input
            type='text'
            name='trailerUrl'
            id='trailerUrl'
            onChange={(e) =>
              setFormData({ ...formData, trailerUrl: e.target.value })
            }
            value={formData.trailerUrl}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='genreId'>Kategoria</label>
          <select
            className='selectclass'
            onChange={(e) =>
              setFormData({ ...formData, genreId: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, poster: e.target.value })
            }
            value={formData.poster}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='background'>Tło:</label>
          <input
            type='text'
            name='background'
            id='background'
            onChange={(e) =>
              setFormData({ ...formData, background: e.target.value })
            }
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
