const { pool } = require('../config/initDB')

const getCartQuery = async (userID) => {
  const response = await pool.query('SELECT cart FROM users WHERE id = $1;', [userID])
  console.log('get cart db response', response)
  return response
}

const putCartQuery = async (cart, userID) => {
  const response = await pool.query(`UPDATE users
  SET cart = $1 WHERE id = $2;`,
  [cart, userID])

  console.log('put cart db response', cart, response)
  return response
}

module.exports = {
  getCartQuery,
  putCartQuery
}
