import React from 'react';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import ReactGA from 'react-ga4';
import appReducer from './reducers/index';
import App from './components/App';
import { loadState, subscribeLocalStorage } from './utils/localStorage';
import { register } from './utils/serviceWorkerRegistration';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const initialState = { ...preloadedState, ...loadState() };

const store = createStore(appReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

subscribeLocalStorage(store);

ReactGA.initialize('G-0MGL667M43');
ReactGA.send('pageview');

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

register();
