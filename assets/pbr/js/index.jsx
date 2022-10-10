import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import ReactGA from 'react-ga4';
import reducers from './reducers/index';
import App from './components/App';
import { loadState, subscribeLocalStorage } from './utils/localStorage';
import '../css/index.css';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store = configureStore({
  reducer: reducers,
  preloadedState: { ...loadState(), ...preloadedState },
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

subscribeLocalStorage(store);

ReactGA.initialize('G-0MGL667M43');
ReactGA.send('pageview');

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
