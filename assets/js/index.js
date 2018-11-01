import React from 'react';
import {hydrate} from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {BrowserRouter} from 'react-router-dom';
import * as ReactGA from 'react-ga';
import appReducer from './reducers/index';
import App from './components/App';
import '../scss/index.scss';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(appReducer, preloadedState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactGA.initialize('TBD');
ReactGA.pageview(window.location.pathname + window.location.search);

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'),
);