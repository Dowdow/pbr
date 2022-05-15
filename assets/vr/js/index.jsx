import React from 'react';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './reducers';
import App from './components/App';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const initialState = { ...preloadedState };

const store = createStore(appReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
