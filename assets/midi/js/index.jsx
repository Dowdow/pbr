import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import App from './components/App';
import appReducer from './reducers';
import '../scss/index.scss';

const store = createStore(appReducer, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
