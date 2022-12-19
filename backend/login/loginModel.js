const { pool } = require('../config/initDB')

async function loginCreds (userID) {
  const response = await pool.query('SELECT * from users WHERE id=$1;', [userID]) // change *
  const creds = response.rows
  console.log(creds[0])
  return creds[0]
}

module.exports = { loginCreds }
