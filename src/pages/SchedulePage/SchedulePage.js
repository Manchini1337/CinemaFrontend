import React, { useState, useEffect } from 'react';
import './schedulepage.scss';
import BasicGrid from '../../components/BasicGrid/BasicGrid';
import api from '../../utils/api/axios.interceptor';

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api
      .get('/moviesevents')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get('/genres')
      .then((response) => {
        setGenres(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='schedule__section'>
      <BasicGrid events={events} genres={genres} />
    </div>
  );
};

export default SchedulePage;
