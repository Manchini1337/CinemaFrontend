import React, { useState, useEffect } from 'react';
import './orderpage.scss';
import { useSelector } from 'react-redux';
import api from '../../utils/api/axios.interceptor';
import OrderForm from '../../components/order-form/OrderForm';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MoviePoster from '../../components/movie-poster/MoviePoster';
import { format } from 'date-fns';

const OrderPage = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [price, setPrice] = useState(0);
  const [event, setEvent] = useState({
    id: '1',
    startDate: new Date(),
    endDate: new Date(),
    movie: {
      id: '1',
      name: '',
      poster: '',
      background: '',
    },
  });

  useEffect(() => {
    api
      .get(`/events/${order.eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setPrice(order.selectedSeats.length * 19);
  }, []);

  return (
    <>
      <div
        className='banner'
        style={{ backgroundImage: `url(${event.movie.background})` }}
      ></div>
      <div className='order__section'>
        <h1>Podsumowanie</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div className='order__movie--summary'>
                <MoviePoster poster={event?.movie.poster} />
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className='order__movie--summary'>
                <h2>{event?.movie.name}</h2>
                <h3>{format(new Date(event.startDate), 'yyyy-MM-dd')}</h3>
                <h4>{format(new Date(event.startDate), 'cccc HH:mm')}</h4>
              </div>
              <div className='order__tickets--summary'>
                <h2>Moje bilety:</h2>

                {order.selectedSeats.map((seat) => (
                  <p key={seat.id}>Miejsce {seat.name} </p>
                ))}
              </div>
              <div className='order__price--summary'>
                <h2>Suma: </h2>
                {price.toString()} zł
              </div>
            </Grid>
            <Grid item xs={4}>
              <OrderForm order={order} user={user} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default OrderPage;
