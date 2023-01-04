const { getCartQuery, putCartQuery } = require('./cartModel.js')

const getCartFunction = async (req, res) => {
  const userID = req.userID
  const cart = await getCartQuery(userID)
  try {
    res.sendStatus(404)
  } catch (err) {
    res.json({ cart })
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
