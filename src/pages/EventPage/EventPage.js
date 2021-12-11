import React, { useState, useEffect } from 'react';
import './eventpage.scss';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MoviePoster from '../../components/movie-poster/MoviePoster';
import { useParams } from 'react-router-dom';
import api from '../../utils/api/axios.interceptor';

const EventPage = () => {
  const { id } = useParams();
  const [show, setShow] = useState({
    startDate: '',

    movie: {
      name: '',
      poster: '',
    },
  });
  // .find((s) => s.id === Number(id))
  useEffect(() => {
    api
      .get('/events')
      .then((response) => {
        setShow(response.data.find((s) => s.id === Number(id)));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='event__section'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <MoviePoster poster={show.movie.poster ? show.movie.poster : ''} />
          </Grid>
          <Grid item xs={6}>
            <div className='event__info'>
              <h2>{show.movie.name}</h2>
              <h3>{show.startDate.toString()}</h3>
              <h4>{show.startDate.toString()}</h4>
            </div>
            <div className='event__container'>
              <div className='event__screen'></div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className='event__order__summary'>
              Tutaj podsumowanie biletów
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EventPage;
