const { pool } = require('../config/initDB')

const createOrderQuery = async (productsIdArray, userID) => {
  const response = await pool.query(
    `INSERT INTO orders
    (user_id, created_at)
    VALUES ($1, current_timestamp)
    RETURNING id;
    `, [userID])

  // get order id from response
  const orderID = response.rows[0].id
  console.log('after first', response)
  for (let i = 0; i < productsIdArray.length; i++) {
    await pool.query(
      `INSERT INTO orders_mapping
      (order_id, product_id)
      VALUES ($1, $2);
      `, [orderID, productsIdArray[i]])
  }
}

module.exports = { createOrderQuery }
