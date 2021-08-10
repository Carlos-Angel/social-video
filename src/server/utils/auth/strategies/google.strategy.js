const axios = require('axios');
const boom = require('@hapi/boom');
const passport = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');

const {
  config: { apiUrl, apiKeyToken },
  google,
} = require('../../../config');

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, callback) => {
      const { data, status } = await axios({
        url: `${apiUrl}/api/v1/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile._json.name,
          email: profile._json.email,
          password: profile.id,
          apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        callback(boom.unauthorized(), false);
      }
      callback(null, data);
    },
  ),
);
