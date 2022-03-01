import React, { useEffect, useState } from 'react';
import './userpage.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api/axios.interceptor';
import CollapsibleTable from '../../components/CollapsibleTable/CollapsibleTable';
import MovieForm from '../../components/movie-form/MovieForm';
import EventForm from '../../components/event-form/EventForm';
import OrderList from '../../components/orderlist/OrderList';

import UserForm from '../../components/user-update-form/UserForm';

const UserPage = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userOrders, setUserOrders] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieMessage, setMovieMessage] = useState('');
  const [eventMessage, setEventMessage] = useState('');

  useEffect(() => {
    api
      .get('/movies')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get('/genres')
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user.email === '') {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    api
      .get('/orders')
      .then((res) => {
        setUserOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const addMovie = async (formData) => {
    try {
      const response = await api.post('/movies', {
        name: formData.name,
        description: formData.description,
        trailerUrl: formData.trailerUrl,
        genreId: formData.genreId,
        poster: formData.poster,
        background: formData.background,
      });

      if (response) {
        setMovieMessage('Dodano film do bazy.');
      }
    } catch (error) {
      setMovieMessage('Wystąpił błąd, spróbuj ponownie.');
    }
  };

  const addEvent = async (movieId, startDate, endDate) => {
    try {
      const response = await api.post('/events', {
        movieId: Number(movieId),
        startDate: startDate,
        endDate: endDate,
      });
      if (response.status === 200) {
        setEventMessage('Poprawie dodano seans');
      }
    } catch (error) {
      setEventMessage('Wystąpił błąd, spróbuj ponownie.');
    }
  };

  return (
    <div className='usersection'>
      <div className='section'>
        {(user.type === 'ADMIN' || user.type === 'PERSONEL') && (
          <>
            <h2>Historia zamówień</h2>
            <CollapsibleTable orders={userOrders} />
            <div className='event__form'>
              <h2>Dodaj film</h2>
              <MovieForm
                addMovie={addMovie}
                message={movieMessage}
                genres={genres}
              />
            </div>
            <div className='event__form'>
              <h2>Dodaj seans</h2>
              <EventForm
                addEvent={addEvent}
                movies={movies}
                message={eventMessage}
              />
            </div>
          </>
        )}
        {user.type === 'USER' && (
          <>
            <div className='event__form'>
              <h2>Moje bilety</h2>
              <OrderList orders={userOrders} />
            </div>
            <div className='event__form'>
              <h2>Zmień dane</h2>
              <UserForm user={user} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
