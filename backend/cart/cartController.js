const { getCartQuery, putCartQuery } = require('./cartModel.js')

const getCartFunction = async (req, res) => {
  const userID = req.userID
  const cart = await getCartQuery(userID)
  try {
    res.json({ cart })
  } catch (err) {
    res.sendStatus(404)
  }
}

const putCartFunction = async (req, res) => {
  const cart = req.body.cart
  try {
    await putCartQuery(JSON.stringify(cart),
      req.userID)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400)
  }
}

module.exports = {
  getCartFunction,
  putCartFunction
}
