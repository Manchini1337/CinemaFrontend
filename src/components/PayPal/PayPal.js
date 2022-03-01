import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api/axios.interceptor';
import { useNavigate } from 'react-router-dom';

export default function Paypal({ price, user, order }) {
  const paypal = useRef();
  let navigate = useNavigate();
  const firstUpdate = useRef(true);
  const secondUpdate = useRef(true);
  const [success, setSuccess] = useState(false);

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userId: null,
    eventId: null,
    seatId: null,
  });

  useEffect(() => {
    if (user.username) {
      setDetails({
        ...details,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        userId: user.id,
      });
    }
  }, [details.eventId]);

  useEffect(() => {
    setDetails({
      ...details,
      eventId: order.eventId,
      seatId: order.selectedSeats,
    });
  }, []);

  useEffect(() => {
    if (secondUpdate.current) {
      secondUpdate.current = false;
    } else {
      try {
        const response = api.post('/orders', {
          firstName: details.firstName,
          lastName: details.lastName,
          phoneNumber: details.phoneNumber,
          email: details.email,
          userId: user.id ? user.id : null,
          eventId: order.eventId,
          seatId: order.selectedSeats,
          isPaid: true,
        });
        if (response) {
          console.log('udalo sie, zrob redirect');
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [success]);

  const newPrice = price.toFixed(2);
  console.log(details);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      window.paypal
        .Buttons({
          createOrder: (data, actions, error) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description: 'Bilety na film',
                  amount: {
                    currency_code: 'PLN',
                    value: newPrice,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setSuccess(true);
            console.log(order);
          },
          onError: (error) => {
            console.log(error);
          },
        })
        .render(paypal.current);
    }
  }, [price]);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
