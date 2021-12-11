import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api/axios.interceptor';

const initialMoviesState = {
  movies: [],
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (thunkAPI) => {
    return (await api.get('/movies')).data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialMoviesState,
  reducers: {
    getMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
