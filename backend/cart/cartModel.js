const { pool } = require('../config/initDB')

const getCartQuery = async (userID) => {
  const response = await pool.query('SELECT cart FROM users WHERE id = $1;', [userID])
  return JSON.parse(response.rows[0].cart)
}

const putCartQuery = async (cart, userID) => {
  await pool.query(`UPDATE users
  SET cart = $1 WHERE id = $2;`,
  [cart, userID])
}

module.exports = {
  getCartQuery,
  putCartQuery
}
