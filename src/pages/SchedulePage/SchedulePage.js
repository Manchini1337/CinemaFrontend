import React, { useState, useEffect } from 'react';
import './schedulepage.scss';
import BasicGrid from '../../components/BasicGrid/BasicGrid';
import api from '../../utils/api/axios.interceptor';

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [genres, setGenres] = useState([]);
  // useEffect(() => {
  //   api
  //     .get('/events')
  //     .then((response) => {
  //       const newEvents = response.data;
  //       for (let i = 0; i < newEvents.length; i++) {
  //         for (let j = 0; j < newEvents.length; j++) {

  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    api
      .get('/events')
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
