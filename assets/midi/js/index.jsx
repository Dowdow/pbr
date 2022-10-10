import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App';
import reducers from './reducers';
import { loadState, subscribeLocalStorage } from './utils/localStorage';
import '../css/index.css';

const store = configureStore({
  reducer: reducers,
  preloadedState: { ...loadState() },
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV === 'development',
});

subscribeLocalStorage(store);

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
