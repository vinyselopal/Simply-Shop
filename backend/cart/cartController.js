const { getCartQuery, putCartQuery } = require('./cartModel.js')

const getCartFunction = async (req, res) => {
  const userId = req.userId
  console.log('userId', userId)
  const response = await getCartQuery(userId)
  if (!response?.rows[0]?.cart) res.status(404)
  else {
    res.json(JSON.parse(response.rows[0].cart))
  }
}

const putCartFunction = async (req, res) => {
  const cart = req.body.cart
  try {
    const response = await putCartQuery(JSON.stringify(cart),
      req.body.userID)
    res.status(200)
    res.json(response)
  } catch (err) {
    res.status(400)
  }
}

module.exports = {
  getCartFunction,
  putCartFunction
}
