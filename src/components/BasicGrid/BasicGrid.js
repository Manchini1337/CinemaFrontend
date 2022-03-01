import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MoviePoster from '../movie-poster/MoviePoster';
import './basicgrid.scss';
import { OutlineButton } from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { format, isSameDay } from 'date-fns';

export default function BasicGrid({ events, genres, date }) {
  let navigate = useNavigate();

  const chosenDayMovies = events.filter((event) =>
    event.movieEvents.some((movieEvent) =>
      isSameDay(new Date(movieEvent.startDate), date)
    )
  );

  if (!chosenDayMovies.length) {
    return (
      <p className='warning'>Brak seansów w dniu dzisiejszym. Przepraszamy</p>
    );
  }

  return (
    <>
      <div className='schedule__container'>
        <Box sx={{ flexGrow: 1 }}>
          {chosenDayMovies.map((event, i) => {
            const chosenMovieEvents = event.movieEvents.filter((movieEvent) =>
              isSameDay(new Date(movieEvent.startDate), date)
            );

            return (
              <Grid container key={event.id}>
                <Grid item xs={3}>
                  <MoviePoster poster={event.poster} />
                </Grid>
                <Grid item xs={9} style={{ position: 'relative' }}>
                  <div className='movie__info'>
                    <h2>
                      <Link to={`/movie/${event.id}`}>{event.name}</Link>
                    </h2>
                    <div className='movie__info--border'></div>

                    <div className='movie__info--desc'>
                      <p>{event.description}</p>
                    </div>
                    <div className='movie__info--buttons'>
                      {chosenMovieEvents.map((movieEvent) => (
                        <OutlineButton
                          key={movieEvent.id}
                          className='movie__info__buttons--smaller'
                          onClick={() => navigate(`/event/${movieEvent.id}`)}
                        >
                          {format(new Date(movieEvent.startDate), 'HH:mm')}
                        </OutlineButton>
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </Box>
      </div>
    </>
  );
}
