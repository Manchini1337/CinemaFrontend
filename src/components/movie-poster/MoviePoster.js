import React from 'react';

import './movieposter.scss';

const MoviePoster = (props) => {
  const bg = props.poster
    ? props.poster
    : 'https://image.tmdb.org/t/p/original/cNzCJnG4wstosen59BhydnUkaZJ.jpg';

  return (
    <>
      <div className='movie-poster'>
        <img src={bg} alt='poster' />
      </div>
    </>
  );
};

export default MoviePoster;
