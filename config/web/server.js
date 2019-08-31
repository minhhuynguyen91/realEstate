if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const config = process.env;

module.exports = config;