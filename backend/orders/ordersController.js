const {
  createOrderQuery,
  deleteOrderQuery,
  placeOrderQuery
} = require('./ordersModel')

const createOrderFunction = async (req, res) => {
  const { productsIdArray } = req.body
  const userID = req.userID
  const response = await createOrderQuery(productsIdArray, userID)
  if (response) {
    res.status(200)
    res.json(response)
  } else res.sendStatus(500)
}

const deleteOrderFunction = async (req, res) => {
  const { orderID } = req.params
  const response = await deleteOrderQuery(orderID)
  if (response) {
    res.status(200)
    res.json(response)
  } else res.sendStatus(500)
}

const orderPlacement = async (req, res) => {
  const { orderID } = req.params
  const { deadline, paymentAmount, products } = req.body
  const response = await placeOrderQuery(orderID, deadline, paymentAmount, products)
  if (response) {
    res.status(200)
    res.json(response)
  } else res.sendStatus(500)
}

module.exports = { createOrderFunction, deleteOrderFunction, orderPlacement }
