const { pool } = require('../config/initDB')

const getCartQuery = async (userId) => {
  return await pool.query('SELECT cart FROM users WHERE id = $1;', [userId])
}

const putCartQuery = async (cart, userID) => {
  console.log('in cart model', cart, userID)
  return await pool.query(`UPDATE users
    SET cart = $1 WHERE id = $2;`,
  [cart, userID])
}

module.exports = {
  getCartQuery,
  putCartQuery
}
