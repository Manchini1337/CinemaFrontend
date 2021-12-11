import { createSlice } from '@reduxjs/toolkit';

const initialGenresState = {
  genres: [],
};

const genreSlice = createSlice({
  name: 'genre',
  initialState: initialGenresState,
  reducers: {
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const genreActions = genreSlice.actions;

export default genreSlice;
