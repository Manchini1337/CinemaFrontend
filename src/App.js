import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/MoviePage/MoviePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Login from './pages/Login/Login';
import UserPage from './pages/UserPage/UserPage';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import EventPage from './pages/EventPage/EventPage';
import { useEffect } from 'react';
import api from './utils/api/axios.interceptor';
import { useDispatch } from 'react-redux';
import { userActions } from './store/userslice';
import OrderPage from './pages/OrderPage/OrderPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get('/users/data')
      .then((response) => {
        dispatch(userActions.setUserData(response.data));
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/user' element={<UserPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/schedule' element={<SchedulePage />}></Route>
        <Route path='/order' element={<OrderPage />}></Route>
        <Route path='/movie/:id' element={<MoviePage />}></Route>
        <Route path='/event/:id' element={<EventPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
