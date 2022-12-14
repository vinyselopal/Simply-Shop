const {
  getProductsQuery,
  getProductsInPartsQuery,
  getProductsCountQuery,
  getMatchingProductsQuery
} = require('./productsModel')
const getProductsFunction = async (req, res) => {
  const products = await getProductsQuery()
  if (!products.rows[0]) res.status(404)
  else {
    res.json(JSON.stringify(products.rows))
  }
}

const getProductsInPartsFunction = async (req, res) => {
  const { page, category } = req.query
  const products = await getProductsInPartsQuery(page, category)
  if (!products.rows[0]) res.status(404)
  else {
    res.json(JSON.stringify(products.rows))
  }
}

const getProductsCountFunction = async (req, res) => {
  const { category } = req.params
  const response = await getProductsCountQuery(category)
  const count = response.rows[0].count
  if (!count) res.status(404)
  else {
    res.json(count)
  }
}

const getMatchingProductsFunction = async (req, res) => {
  const { keyword } = req.params
  const response = await getMatchingProductsQuery(keyword)
  const count = response.rows
  if (!count) res.status(404)
  else {
    res.json(count)
  }
}

module.exports = {
  getProductsFunction,
  getProductsInPartsFunction,
  getProductsCountFunction,
  getMatchingProductsFunction
}
