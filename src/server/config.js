require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  apiUrl: process.env.API_URL,
  sessionSecret: process.env.SESSION_SECRET,
  apiKeyToken: process.env.API_KEY_TOKEN,
};

const google = {
  clientSecret: '',
  clientID: '',
};

module.exports = { config, google };
