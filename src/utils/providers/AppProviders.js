import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

const AppProviders = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    </>
  );
};

export default AppProviders;
