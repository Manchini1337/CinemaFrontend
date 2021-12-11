import React, { useEffect, useState } from 'react';

import './orderlist.scss';

const dummy_order = [
  {
    createdAt: '10 sierpnia',
    email: '@kowal@wp.pl',
    firstName: 'dla',
    id: 5,
    isCancelled: false,
    isPaid: false,
    phoneNumber: '123123123',
    lastName: 'kumpla',
    seatId: 'A3, A4, A5',
    event: {
      movieId: 'Venom: Bardzo długa nazwa filmu',
      seats: 'all seats i guess',
      startDate: 'kiedys',
      endDate: 'pozniej',
    },
    user: {
      email: 'mnowak1992@gmail.com',
      firstName: 'haslo i login takie same',
      lastName: 'haslo i login takie same',
      phoneNumber: '728345123',
      username: 'Kamilzdun!123',
    },
  },
  {
    createdAt: '10 sierpnia',
    email: '@kowal@wp.pl',
    firstName: 'dla',
    id: 5,
    isCancelled: false,
    isPaid: false,
    phoneNumber: '123123123',
    lastName: 'kumpla',
    seatId: 'A3, A4, A5',
    event: {
      movieId: 'Venom: Bardzo długa nazwa filmu',
      seats: 'all seats i guess',
      startDate: 'kiedys',
      endDate: 'pozniej',
    },
    user: {
      email: 'mnowak1992@gmail.com',
      firstName: 'haslo i login takie same',
      lastName: 'haslo i login takie same',
      phoneNumber: '728345123',
      username: 'Kamilzdun!123',
    },
  },
];

const OrderList = ({ orders }) => {
  console.log(orders);
  return (
    <>
      <table className='content-table'>
        <thead>
          <tr>
            <th>Dane</th>
            <th>Data</th>
            <th>Film</th>
            <th>Miejsce</th>
            <th>Czy zapłacono?</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <td>{order.email}</td>
              <td>{order.createdAt}</td>
              <td>{order.event.movie.name}</td>
              <td>{order.seatId}</td>
              <td>{order.isPaid ? 'Tak' : 'Nie'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderList;
