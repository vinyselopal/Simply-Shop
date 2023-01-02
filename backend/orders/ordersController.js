const {
  createOrderInDB,
  deleteOrderInDB
} = require('./ordersModel')

const createOrderController = async (req, res) => {
  console.log('req.body', req.body)
  const { productsIdArray, paymentAmount, expectedDelivery } = req.body
  const userID = req.userID
  const orderID = await createOrderInDB(productsIdArray, userID, paymentAmount, expectedDelivery)
  if (orderID) {
    res.status(200)
      .json({ orderID })
  } else res.sendStatus(500)
}

const deleteOrderController = async (req, res) => {
  const { orderID } = req.params
  const response = await deleteOrderInDB(orderID)
  if (response) {
    res.status(200)
      .json(response)
  } else res.sendStatus(500)
}

module.exports = { createOrderController, deleteOrderController }
