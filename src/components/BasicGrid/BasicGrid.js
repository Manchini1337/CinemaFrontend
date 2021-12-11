import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MoviePoster from '../movie-poster/MoviePoster';
import './basicgrid.scss';
import { OutlineButton } from '../button/Button';
import { useNavigate } from 'react-router-dom';

export default function BasicGrid({ events, genres }) {
  let navigate = useNavigate();

  return (
    <>
      <div className='schedule__container'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={3}>
              <MoviePoster />
            </Grid>
            <Grid item xs={9} style={{ position: 'relative' }}>
              <div className='movie__info'>
                <h2>Shang-Chi i legenda dziesięciu pierścieni</h2>
                <div className='movie__info--border'></div>
                <span className='genre__item'>fantasy1</span>
                <div className='movie__info--desc'>
                  <p>
                    Sierota obdarzony specjalnymi mocami, wychowany w szkole dla
                    wyjątkowych dzieci prowadzonej przez Mandaryna, całe życie
                    przygotowywał się do turnieju, w którym wezmą udział
                    najwięksi mistrzowie sztuk walki.
                  </p>
                </div>
                <div className='movie__info--buttons'>
                  <h3>Piątek 12.01</h3>
                  <OutlineButton className='movie__info__buttons--smaller'>
                    18:00
                  </OutlineButton>
                  <OutlineButton className='movie__info__buttons--smaller'>
                    21:00
                  </OutlineButton>
                  <OutlineButton className='movie__info__buttons--smaller'>
                    22:00
                  </OutlineButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div className='schedule__container'>
        <Box sx={{ flexGrow: 1 }}>
          {events.map((event) => (
            <Grid container key={event.id}>
              <Grid item xs={3}>
                <MoviePoster poster={event.movie.poster} />
              </Grid>
              <Grid item xs={9} style={{ position: 'relative' }}>
                <div className='movie__info'>
                  <h2>{event.movie.name}</h2>
                  <div className='movie__info--border'></div>
                  <span className='genre__item'>test</span>
                  <div className='movie__info--desc'>
                    <p>{event.movie.description}</p>
                  </div>
                  <div className='movie__info--buttons'>
                    <h3>{event.startDate.toString()}</h3>
                    <OutlineButton
                      className='movie__info__buttons--smaller'
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      {event.startDate.toString()}
                    </OutlineButton>
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
