import { createSlice } from '@reduxjs/toolkit';

const initialOrderSlice = {
  selectedSeats: [],
  eventId: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderSlice,
  reducers: {
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload.selectedSeats;
      state.eventId = action.payload.eventId;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
