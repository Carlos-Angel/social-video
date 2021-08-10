const axios = require('axios');
const boom = require('@hapi/boom');
const passport = require('passport');
const { OAuth2Strategy } = require('passport-oauth');

const {
  config: { apiUrl, apiKeyToken },
  google,
} = require('../../../config');

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_URSERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

const oauth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: '/auth/google-oauth/callback',
  },
  async (accessToken, refreshToken, profile, callback) => {
    const { data, status } = await axios({
      url: `${apiUrl}/api/v1/auth/sign-provider`,
      method: 'post',
      data: {
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken,
      },
    });

    if (!data || status !== 200) {
      callback(boom.unauthorized());
    }

    callback(null, data);
  },
);

oauth2Strategy.userProfile = (accessToken, done) => {
  this._oauth2.get(GOOGLE_URSERINFO_URL, accessToken, (err, body) => {
    if (err) {
      done(err);
    }
    try {
      const { sub, name, email } = JSON.parse(body);
      const profile = {
        id: sub,
        name,
        email,
      };

      done(null, profile);
    } catch (error) {
      done(error);
    }
  });
};

passport.use('google-oauth', oauth2Strategy);
