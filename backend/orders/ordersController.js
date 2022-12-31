const {
  createOrderInDB,
  deleteOrderInDB,
  placeOrderInDB
} = require('./ordersModel')

const createOrderController = async (req, res) => {
  const { productsIdArray } = req.body
  const userID = req.userID
  const response = await createOrderInDB(productsIdArray, userID)
  if (response) {
    res.status(200)
      .json(response)
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

const orderPlacementController = async (req, res) => {
  const { orderID } = req.params
  const { deadline, paymentAmount, products } = req.body
  const response = await placeOrderInDB(orderID, deadline, paymentAmount, products)
  if (response) {
    res.status(200)
      .json(response)
  } else res.sendStatus(500)
}

module.exports = { createOrderController, deleteOrderController, orderPlacementController }
