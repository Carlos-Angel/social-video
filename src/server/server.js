/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import axios from 'axios';

import reducer from '../frontend/reducers';
import serverRoutes from '../frontend/routes/serverRoutes';
import getManifest from './getManifest';

import { config } from './config';
import { authApp, userMovieApp } from './routes';

const { dev, port } = config;

const app = express();

/** middleware */
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

if (dev) {
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hasManifest) req.hasManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.disable('x-powered-by');
}

// prettier-ignore
const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const venderBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${mainStyles}" type="text/css" >
    <title>Social Video</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="${mainBuild}" type="text/javascript" ></script>
    <script src="${venderBuild}" type="text/javascript" ></script>
  </body>
  </html>
  `;
};
const renderApp = async (req, res) => {
  let initialState;
  const { email, name, id, token } = req.cookies;

  try {
    let movieList = await axios({
      url: `${config.apiUrl}/api/v1/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get',
    });

    let myList = await axios({
      url: `${config.apiUrl}/api/v1/user-movies?userId=${id}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get',
    });

    movieList = movieList.data.data;

    myList = myList.data.data;

    initialState = {
      user: { email, name, id },
      notification: { message: '', type: '' },
      loading: false,
      error: false,
      playing: {},
      myList,
      trends: movieList.filter(
        (movie) => movie.contentRating === 'PG' && movie._id !== undefined,
      ),
      originals: movieList.filter(
        (movie) => movie.contentRating === 'G' && movie._id !== undefined,
      ),
    };
  } catch (error) {
    initialState = {
      user: {},
      notification: { message: '', type: '' },
      loading: false,
      error: false,
      playing: {},
      myList: [],
      trends: [],
      originals: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  //prettier-ignore
  const isLogged = (initialState.user.id);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes(isLogged))}
      </StaticRouter>
    </Provider>,
  );

  res.send(setResponse(html, preloadedState, req.hasManifest));
};

/** routes */
userMovieApp(app);
authApp(app);
app.get('*', renderApp);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on http://localhost:${port}`);
});
