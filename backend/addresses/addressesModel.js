const { pool } = require('../config/initDB')

const getAddressesQuery = async (userID) => {
  console.log('in get addressmodel')
  const response = await pool.query(
    `SELECT address from addresses_users_mapping
    WHERE user_id = 8619`
  )
  console.log('get addresses db response', response)
  return response
}

module.exports = {
  getAddressesQuery
}
