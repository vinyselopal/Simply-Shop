const { pool } = require('../config/initDB')

async function validateEmail (email) {
  const response = await pool.query('SELECT * from users WHERE email_address=$1', [email])
  return !response.rows.length
}

async function insertUser (email, hashedPass) {
  return await pool.query(insertUser, [email, hashedPass])
}
module.exports = { validateEmail, insertUser }
