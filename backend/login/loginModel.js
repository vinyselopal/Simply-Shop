const { pool } = require('../config/initDB')

async function loginCreds (userID) {
  const response = await pool.query('SELECT id, password from users WHERE id=$1;', [userID])
  const creds = response.rows
  return creds[0]
}

module.exports = { loginCreds }
