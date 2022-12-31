const {
  getProductsFromDB,
  getFilteredProductsASCFromDB,
  getProductsCountFromDB,
  getSearchedProductsFromDB
} = require('./productsModel')
const getProductsController = async (req, res) => {
  const products = await getProductsFromDB()
  if (!products.rows[0]) res.sendStatus(404)
  else {
    res.json(JSON.stringify(products.rows))
  } // remove (frontend too)
}

const getFilteredProductsController = async (req, res) => {
  const { page, category, sortby, order } = req.query
  const products = await getFilteredProductsASCFromDB(page, category, order, sortby)
  if (!products.rows[0]) res.sendStatus(404)
  else {
    res.json(products.rows)
  }
}

const getProductsCountController = async (req, res) => {
  const { category } = req.params
  const response = await getProductsCountFromDB(category)
  const count = response.rows[0].count // get result from model
  if (!count) res.sendStatus(404) // inconsistent braces, return.
  else {
    res.json(count)
  }
}

const getSearchedProductsController = async (req, res) => {
  const { keywords } = req.params
  const response = await getSearchedProductsFromDB(keywords.split(' '))
  const count = response.rows
  if (!count) res.sendStatus(404)
  else {
    res.json(count)
  }
}

module.exports = {
  getProductsController,
  getFilteredProductsController,
  getProductsCountController,
  getSearchedProductsController
}
