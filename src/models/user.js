const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createUser = async (userData) => {
  const { username, email, passwordHash } = userData;
  const res = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, passwordHash]
  );
  return res.rows[0];
};

module.exports = { createUser };