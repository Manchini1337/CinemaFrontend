import React, { useState, useEffect } from 'react';
import './eventpage.scss';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MoviePoster from '../../components/movie-poster/MoviePoster';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api/axios.interceptor';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/orderslice';
import { OutlineButton } from '../../components/button/Button';
import { format } from 'date-fns';

const EventPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [show, setShow] = useState({
    startDate: new Date(),

    movie: {
      name: '',
      poster: '',
    },
  });

  const [seats, setSeats] = useState([]);
  const [chosenSeats, setChosenSeats] = useState([]);

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((response) => {
        setShow(response.data);
        setSeats(response.data.seats);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [chosenSeats]);

  const handleSeatClick = (seat) => {
    if (seat.isAvailable) {
      setChosenSeats([...chosenSeats, seat]);
    } else {
      setChosenSeats(
        chosenSeats.filter((chosenSeat) => chosenSeat.id !== seat.id)
      );
    }
    setSeats(
      seats.map((updatedSeat) =>
        updatedSeat.id === seat.id
          ? { ...seat, isAvailable: !seat.isAvailable }
          : updatedSeat
      )
    );
  };

  const handleConfirmClick = () => {
    dispatch(
      orderActions.setSelectedSeats({
        selectedSeats: chosenSeats,
        eventId: Number(id),
      })
    );
    navigate('/order');
  };

  return (
    <div className='event__section'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <MoviePoster poster={show.movie.poster ? show.movie.poster : ''} />
          </Grid>
          <Grid item xs={6}>
            <div className='event__info'>
              <h2>{show.movie.name}</h2>
              <h3>{format(new Date(show.startDate), 'cccc dd.MM HH:mm')}</h3>
            </div>
            <div className='event__container'>
              <div className='event__screen'></div>
              <div className='event__seats'>
                {seats.map((seat, index) => (
                  <div
                    key={seat.id}
                    className={
                      show.seats[index].isAvailable
                        ? seat.isAvailable
                          ? 'seat seat__available'
                          : 'seat seat__selected'
                        : 'seat seat__unavailable'
                    }
                    onClick={() =>
                      show.seats[index].isAvailable
                        ? handleSeatClick(seat)
                        : null
                    }
                  >
                    {seat.name}
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={3} style={{ position: 'relative' }}>
            <div className='event__order__summary'>
              <h3>Wybrane miejsca:</h3>
              {chosenSeats.map((chosenSeat) => (
                <div key={chosenSeat.id}> {chosenSeat.name}</div>
              ))}
              <OutlineButton
                className='event__order--button'
                onClick={handleConfirmClick}
              >
                test
              </OutlineButton>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EventPage;
