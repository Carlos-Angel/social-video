import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import App from './routes/App';
import reducer from './reducers';

import './assets/styles/App.scss';

const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk)),
);

delete window.__PRELOADED_STATE__;

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

//prettier-ignore
renderMethod(
  <Provider store={store}>
    <Router history={history}>
      <App isLogged={(preloadedState.user.id)} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
