import React from 'react';
import { hydrate } from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as ReactGA from 'react-ga';
import appReducer from './reducers/index';
import App from './components/App';
import { loadState, subscribeLocalStorage } from './utils/localStorage';
import '../scss/index.scss';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const initialState = { ...preloadedState, ...loadState() };

const store = createStore(appReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

subscribeLocalStorage(store);

ReactGA.initialize('G-0MGL667M43');
ReactGA.pageview(window.location.pathname + window.location.search);

hydrate(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'),
);