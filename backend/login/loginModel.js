const { pool } = require('../config/initDB')

async function loginCreds (userID) {
  // only get password. name the response differently
  const response = await pool.query('SELECT id, password from users WHERE id=$1;', [userID])
  return response.rows[0]
}

module.exports = { loginCreds }
