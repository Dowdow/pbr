import React from 'react';
import { hydrate } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import ReactGA from 'react-ga4';
import appReducer from './reducers/index';
import App from './components/App';
import { loadState, subscribeLocalStorage } from './utils/localStorage';
import { register } from './utils/serviceWorkerRegistration';
import '../scss/index.scss';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const initialState = { ...preloadedState, ...loadState() };

const store = createStore(appReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

subscribeLocalStorage(store);

ReactGA.initialize('G-0MGL667M43');
ReactGA.send('pageview');

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

register();
