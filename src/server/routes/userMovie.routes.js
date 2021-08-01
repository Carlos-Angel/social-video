const express = require('express');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../config');

function userMovieApp(app) {
  const routes = express.Router();
  app.use('/user-movies', routes);

  routes.post('/', async (req, res, next) => {
    try {
      const { movieId } = req.body;
      const { token, id } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/user-movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'post',
        data: {
          userId: id,
          movieId,
        },
      });

      if (status !== 201) {
        next(boom.badImplementation());
      }

      res.status(201).json(data);
    } catch (error) {
      const { statusCode, message } = error.response.data;
      res.status(statusCode).json({ message, error: true });
    }
  });
  routes.delete('/:userMovieId', async (req, res, next) => {
    try {
      const { userMovieId } = req.params;
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/user-movies/${userMovieId}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'delete',
      });

      if (status !== 200) {
        next(boom.badImplementation());
      }

      res.status(200).json(data);
    } catch (error) {
      const { statusCode, message } = error.response.data;
      res.status(statusCode).json({ message, error: true });
    }
  });
}

module.exports = userMovieApp;
