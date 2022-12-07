let cart = null

const { getCartQuery, putCartQuery } = require('./cartModel.js')

const getCartFunction = async (req, res) => {
  const response = await getCartQuery()
  if (!response.rows[0]) res.status(404)
  else {
    res.json(JSON.parse(response.rows[0].cart))
  }
}

const putCartFunction = async (req, res) => {
  cart = JSON.parse(req.body.cart)
  try {
    await putCartQuery(JSON.stringify(cart),
      req.body.userID)

    res.status(200)
  } catch (err) {
    res.status(400)
  }
}

module.exports = {
  getCartFunction,
  putCartFunction
}
