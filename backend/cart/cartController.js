const { getCartQuery, putCartQuery } = require('./cartModel.js')

const getCartFunction = async (req, res) => {
  console.log('in get cart')
  const userID = req.userID
  const response = await getCartQuery(userID)
  if (!response?.rows[0]?.cart) res.sendStatus(404)
  else {
    res.json(JSON.parse(response.rows[0].cart))
  }
}

const putCartFunction = async (req, res) => {
  console.log('in put cart')
  const cart = req.body.cart
  try {
    const response = await putCartQuery(JSON.stringify(cart),
      req.userID)
    res.status(200)
    res.json(response)
  } catch (err) {
    res.sendStatus(400)
  }
}

module.exports = {
  getCartFunction,
  putCartFunction
}
