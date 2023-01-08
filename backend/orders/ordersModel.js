const { pool } = require('../config/initDB')

const createOrderInDB = async (productsIdArray, userID, paymentAmount, expectedDelivery) => {
  try {
    const response = await pool.query(
      `INSERT INTO orders
      (user_id, created_at, expected_delivery, payment_amount, payment_status, product_ids)
      VALUES ($1, current_timestamp, $2, $3, true, $4)
      RETURNING id;
      `, [userID, expectedDelivery, paymentAmount, productsIdArray])

    const orderID = response.rows[0].id
    console.log('orderID', orderID)
    return orderID
  } catch (err) {
    console.log(err)
  }
}

const deleteOrderInDB = async (orderID) => {
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

const getOrdersFromDB = async (userID) => {
  try {
    const response = await pool.query(
      `SELECT *, o.id as order_id, p.id as product_id FROM
      orders as o 
      INNER JOIN 
      products as p
      ON
      p.id = ANY(o.product_ids)
      WHERE o.user_id = $1
      ORDER BY (created_at) DESC;`, [userID]
    )
    return {
      orders: response.rows,
      ordersCount: response.rowCount
    }
  } catch (err) {
    console.log(err)
  }
}

const placeOrderInDB = async (orderID, deadline, paymentAmount, products) => {
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

module.exports = { createOrderInDB, deleteOrderInDB, placeOrderInDB, getOrdersFromDB }
