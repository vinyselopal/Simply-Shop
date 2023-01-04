const { pool } = require('../config/initDB')

const getAddressesQuery = async (userID) => {
  const response = await pool.query(
    `SELECT address from addresses_users_mapping
    WHERE user_id = 8619`
  )
  return response.rows
}

module.exports = {
  getAddressesQuery
}
