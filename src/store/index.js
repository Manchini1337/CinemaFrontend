import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieslice';
import genreSlice from './genreslice';
import userSlice from './userslice';
import orderSlice from './orderslice';

const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    genre: genreSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
