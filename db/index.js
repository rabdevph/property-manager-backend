const dotenv = require('dotenv');
const colors = require('colors');

const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on('connect', () => {
  console.log(colors.green('Connected to database'));
});

pool.on('error', (err) => {
  throw err;
});

const query = async (text, params, callback) => {
  const start = Date.now();
  const client = await pool.connect();
  const res = client.query(text, params, callback);
  const duration = Date.now() - start;
  console.log(colors.yellow.italic('Executed query:'));
  console.log(colors.white.italic({ text, duration, rows: res.rowCount }));

  client.release();
  return res;
};

module.exports = { query };
