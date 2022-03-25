import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './reducers';
import App from './components/App';
import '../scss/index.scss';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const initialState = { ...preloadedState };

const store = createStore(appReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
