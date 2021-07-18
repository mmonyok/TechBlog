const Sequelize = require('sequelize');
require('dotenv').config();

// Need to setup JAWSDB_URL on Heroku?

/* let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
} */
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;