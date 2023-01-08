const {
  createOrderInDB,
  deleteOrderInDB,
  getOrdersFromDB
} = require('./ordersModel')

const createOrderController = async (req, res) => {
  console.log('req.body', req.body)
  const { productsIdArray, paymentAmount, expectedDelivery } = req.body
  const userID = req.userID
  try {
    const orderID = await createOrderInDB(productsIdArray, userID, paymentAmount, expectedDelivery)
    res.status(200)
      .json({ orderID })
  } catch (err) {
    res.sendStatus(500)
  }
}
const deleteOrderController = async (req, res) => {
  const { orderID } = req.params
  try {
    await deleteOrderInDB(orderID)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}

const getOrderController = async (req, res) => {
  const userID = req.userID
  try {
    const response = await getOrdersFromDB(userID)
    res.status(200).json(response)
  } catch (err) {
    res.sendStatus(500)
  }
}
module.exports = { createOrderController, deleteOrderController, getOrderController }
