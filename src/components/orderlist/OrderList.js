import React from 'react';
import { format } from 'date-fns';

import './orderlist.scss';

const OrderList = ({ orders }) => {
  {
    console.log(orders);
  }
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
              <td>
                <p>{order.firstName + ' ' + order.lastName}</p>
                <p>{order.email}</p>
              </td>

              <td>
                <p>{format(new Date(order.createdAt), 'yyyy-MM-dd')}</p>
                <p>{format(new Date(order.createdAt), 'HH:mm')}</p>
              </td>
              <td>{order.event.movie.name}</td>
              <td>
                {JSON.parse(order.seatId).map((seat) => (
                  <p key={seat.id}>Miejsce {seat.name}</p>
                ))}
              </td>
              <td>{order.isPaid ? 'Tak' : 'Nie'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderList;
