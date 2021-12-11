import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieslice';
import genreSlice from './genreslice';
import userSlice from './userslice';

const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    genre: genreSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
