import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api/axios.interceptor';

import './moviepage.scss';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [urlCode, setUrlCode] = useState('');
  const [genre, setGenre] = useState({});
  const firstUpdate = useRef(true);

  useEffect(() => {
    api
      .get('/movies')
      .then((res) => {
        setMovie(res.data.find((m) => m.id === Number(id)));
      })
      .catch((err) => console.log(err));
  }, [urlCode]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setUrlCode(movie.trailerUrl.slice(32));
    setGenre(movie.genre);
  }, [movie]);

  console.log(genre);

  return (
    <>
      {movie && (
        <>
          <div
            className='banner'
            style={{ backgroundImage: `url(${movie.background})` }}
          ></div>
          <div className='mb-3 movie-content container'>
            <div className='movie-content__poster'>
              <div
                className='movie-content__poster__img'
                style={{ backgroundImage: `url(${movie.poster})` }}
              ></div>
            </div>
            <div className='movie-content__info'>
              <div className='title'>{movie.name}</div>
              <div className='mb-3'>
                <span className='genre__item'>{genre.name}</span>
              </div>

              <p className='overview'>{movie.description}</p>
            </div>
          </div>
          <div className='container'>
            <div className='section mb-3'>
              {movie ? (
                <Video movie={movie} urlCode={urlCode} />
              ) : (
                <p>Loading trailer...</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Video = (props) => {
  const movie = props.movie;
  const urlCode = props.urlCode;
  console.log(urlCode);

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{movie.name} - oficjalny zwiastun filmu</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${urlCode}`}
        ref={iframeRef}
        width='100%'
        title='video'
      ></iframe>
    </div>
  );
};

export default MoviePage;
