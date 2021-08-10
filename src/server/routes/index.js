const authApp = require('./auth.routes');
const userMovieApp = require('./userMovie.routes');
const googleApp = require('./google.routes');
const oauthApp = require('./oauth.routes');

module.exports = {
  authApp,
  userMovieApp,
  googleApp,
  oauthApp,
};
