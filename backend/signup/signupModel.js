const { pool } = require('../config/initDB')

async function checkEmailAlreadyRegistered (email) {
  const response = await pool.query('SELECT COUNT(*) from users WHERE email_address=$1', [email])
  return !!(response.rows[0].count * 1) // response.rows is [{count = '<number of rows>'}]
}

async function insertUser (email, hashedPass) {
  console.log('insertUser')
  const response = await pool.query('INSERT INTO users (email_address, password) VALUES ($1, $2);'
    , [email, hashedPass])
  console.log('response from insertUser', response)
  return response.rowCount
}

async function changeUserStatus (email) {
  const response = await pool.query('UPDATE users SET status = \'active\' WHERE email_address = $1;', [email])
  console.log('after updating user status', response)
  return response
}

module.exports = { checkEmailAlreadyRegistered, insertUser, changeUserStatus }
