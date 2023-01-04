const {
  getFilteredProductsASCFromDB,
  getProductsCountFromDB,
  getSearchedProductsFromDB
} = require('./productsModel')

const getFilteredProductsController = async (req, res) => {
  const { page, category, sortby, order } = req.query
  try {
    const products = await getFilteredProductsASCFromDB(page, category, order, sortby)
    res.json({ products })
  } catch {
    res.sendStatus(404)
  }
}

const getProductsCountController = async (req, res) => {
  const { category } = req.params
  const count = await getProductsCountFromDB(category)
  try {
    res.json({ count })
  } catch (err) {
    res.sendStatus(404)
  }
}

const getSearchedProductsController = async (req, res) => {
  const { keywords } = req.params
  const searchResults = await getSearchedProductsFromDB(keywords.split(' '))
  try {
    res.json({ searchResults })
  } catch {
    res.sendStatus(404)
  }
}

module.exports = {
  getFilteredProductsController,
  getProductsCountController,
  getSearchedProductsController
}
