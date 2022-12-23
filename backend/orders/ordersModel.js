const { pool } = require('../config/initDB')

const createOrderQuery = async (productsIdArray, userID) => {
  try {
    const response = await pool.query(
      `INSERT INTO orders
      (user_id, created_at, payment_status)
      VALUES ($1, current_timestamp, false)
      RETURNING id;
      `, [userID])

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
  // use transactions here, and soft delete
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

const placeOrderQuery = async (orderID, deadline, paymentAmount, products) => {
  try {
    await pool.query(
      `UPDATE orders
      SET deadline = $1, 
      payment_amount = $2,
      payment_status = true
      WHERE
      id = $3;
      `, [deadline, paymentAmount, orderID]
    )

    for (let i = 0; i < products.length; i++) {
      await pool.query(
        `UPDATE products
        SET count = count - $1
        WHERE 
        id = $2;
        `, [products[i].quantity, products[i].item.id]
      )
    }
    return 'confirmed'
  } catch (err) {
    console.log(err)
  }
}
module.exports = { createOrderQuery, deleteOrderQuery, placeOrderQuery }
