const {
  createOrderQuery,
  deleteOrderQuery
} = require('./ordersModel')

const createOrderFunction = async (req, res) => {
  const { productsIdArray } = req.body
  const userID = req.userId
  const response = await createOrderQuery(productsIdArray, userID)
  if (response) {
    res.status(200)
    res.json(response)
  } else res.send(500)
}

const deleteOrderFunction = async (req, res) => {
  const { orderID } = req.params
  const response = await deleteOrderQuery(orderID)
  if (response) {
    res.status(200)
    res.json(response)
  } else res.send(500)
}

module.exports = { createOrderFunction, deleteOrderFunction }
