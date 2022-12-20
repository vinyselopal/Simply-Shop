const {
  createOrderQuery
} = require('./ordersModel')

const createOrderFunction = async (req, res) => {
  const { productsIdArray } = req.body
  const userID = req.userId
  console.log('creds', productsIdArray, userID, req.body)
  const response = await createOrderQuery(productsIdArray, userID)
  console.log('response from post orders ', response)
}

module.exports = { createOrderFunction }
