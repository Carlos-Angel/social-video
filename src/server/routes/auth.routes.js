const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const axios = require('axios');
const { config } = require('../config');

const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = config.dev ? 259200000000000 : 7200000;

/** basic strategy */
require('../utils/auth/strategies/basic');

function authApp(app) {
  const router = express.Router();
  app.use('/auth', router);

  router.post('/sign-in', async (req, res, next) => {
    const { rememberMe } = req.body;
    passport.authenticate('basic', (error, data) => {
      try {
        if (error || !data) {
          const { statusCode } = error;
          res.status(statusCode).json({ message: 'Invalid password or email ', error: true });
        } else {
          req.login(data, { session: false }, async (err) => {
            if (err) {
              next(err);
            }
            const { token, ...user } = data.data;

            res.cookie('token', token, {
              httpOnly: !config.dev,
              secure: !config.dev,
              maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
            });
            res.status(200).json(user);
          });
        }
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post('/sign-up', async (req, res, next) => {
    const { body: user } = req;
    try {
      const result = await axios({
        url: `${config.apiUrl}/api/v1/auth/sign-up`,
        method: 'post',
        data: {
          email: user.email,
          name: user.name,
          password: user.password,
        },
      });

      const userData = result.data;

      res.status(201).json({
        name: req.body.name,
        email: req.body.email,
        id: userData.data.id,
      });
    } catch (error) {
      const { statusCode, message } = error.response.data;
      res.status(statusCode).json({ message, error: true });
    }
  });
}

module.exports = authApp;
