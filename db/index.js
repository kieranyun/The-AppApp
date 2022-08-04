const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.U,
  host: process.env.HOST || 'localhost',
  database: process.env.DB || 'reviews',
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

module.exports = {
  query: (query, params) => pool.query(query, params),
};