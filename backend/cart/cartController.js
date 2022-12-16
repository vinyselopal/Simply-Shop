const { getCartQuery, putCartQuery } = require('./cartModel.js')

const getCartFunction = async (req, res) => {
  const { userId } = req.params
  const response = await getCartQuery(userId)
  if (!response.rows[0].cart) res.status(404)
  else {
    res.json(JSON.parse(response.rows[0].cart))
  }
}

const putCartFunction = async (req, res) => {
  console.log('req.body.cart', req.body.cart)
  console.log('req.body', req.body)

  const cart = req.body.cart
  try {
    const response = await putCartQuery(JSON.stringify(cart),
      req.body.userID)
    console.log('response in putCartFunction', response)
    res.status(200)
    res.json(response)
  } catch (err) {
    console.log('error in putCartFunction', err)
    res.status(400)
  }
}

module.exports = {
  getCartFunction,
  putCartFunction
}
