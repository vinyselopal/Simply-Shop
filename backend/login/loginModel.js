const { pool } = require('../config/initDB')

async function getLoginCredsFromDB (email) {
  const response = await pool.query('SELECT id, password from users WHERE email_address=$1;', [email])
  return response.rows[0]
}

module.exports = { getLoginCredsFromDB }
