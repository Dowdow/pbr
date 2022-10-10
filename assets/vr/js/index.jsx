import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import App from './components/App';
import '../css/index.css';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store = configureStore({
  reducer: reducers,
  preloadedState: { ...preloadedState },
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
