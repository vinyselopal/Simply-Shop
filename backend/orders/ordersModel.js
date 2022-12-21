const { pool } = require('../config/initDB')

const createOrderQuery = async (productsIdArray, userID) => {
  try {
    const response = await pool.query(
      `INSERT INTO orders
      (user_id, created_at)
      VALUES ($1, current_timestamp)
      RETURNING id;
      `, [userID])

    // get order id from response
    const orderID = response.rows[0].id

    for (let i = 0; i < productsIdArray.length; i++) {
      await pool.query(
        `INSERT INTO orders_mapping
        (order_id, product_id)
        VALUES ($1, $2);
        `, [orderID, productsIdArray[i]])
    }
    return orderID
  } catch (err) {
    console.log(err)
  }
}

const deleteOrderQuery = async (orderID) => {
  // use transactions here
  try {
    await pool.query(
      `DELETE FROM orders_mapping
      WHERE
      order_id = $1;
      `, [orderID])
    await pool.query(
      `DELETE FROM orders
      WHERE
      id = $1;
      `, [orderID])
    return 'deleted'
  } catch (err) {
    console.log(err)
  }
}
module.exports = { createOrderQuery, deleteOrderQuery }
