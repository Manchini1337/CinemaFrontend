import React, { useState, useEffect } from 'react';
import './schedulepage.scss';
import BasicGrid from '../../components/BasicGrid/BasicGrid';
import api from '../../utils/api/axios.interceptor';
import BasicDatePicker from '../../components/DatePick/BasicDatePicker';

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [genres, setGenres] = useState([]);
  const [date, setDate] = useState(new Date());

  console.log(events);
  console.log(genres);
  console.log(new Date(date + 1));

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
      <div className='date__container'>
        <BasicDatePicker value={date} onChange={setDate} />
      </div>
      <BasicGrid events={events} genres={genres} date={date} />
    </div>
  );
};

export default SchedulePage;
