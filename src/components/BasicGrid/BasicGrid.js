import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MoviePoster from '../movie-poster/MoviePoster';
import './basicgrid.scss';
import { OutlineButton } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function BasicGrid({ events, genres }) {
  let navigate = useNavigate();

  return (
    <>
      <div className='schedule__container'>
        <Box sx={{ flexGrow: 1 }}>
          {events.map((event, i) => (
            <Grid container key={event.id}>
              <Grid item xs={3}>
                <MoviePoster poster={event.poster} />
              </Grid>
              <Grid item xs={9} style={{ position: 'relative' }}>
                <div className='movie__info'>
                  <h2>{event.name}</h2>
                  <div className='movie__info--border'></div>

                  <div className='movie__info--desc'>
                    <p>{event.description}</p>
                  </div>
                  <div className='movie__info--buttons'>
                    <h3>test</h3>

                    {event.movieEvents.map((movieEvent) => (
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
          ))}
        </Box>
      </div>
    </>
  );
}
