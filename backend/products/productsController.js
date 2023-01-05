const {
  getFilteredProductsASCFromDB,
  getProductsCountFromDB,
  getSearchedProductsFromDB,
  getProductByIDFromDB
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
  try {
    const searchResults = await getSearchedProductsFromDB(keywords.split(' '))
    res.json({ searchResults })
  } catch {
    res.sendStatus(404)
  }
}

const getProductByIDController = async (req, res) => {
  const { productID } = req.params
  console.log('here')
  try {
    const product = await getProductByIDFromDB(productID)
    res.json({ product })
  } catch (err) {
    console.log(err)
    res.sendStatus(404)
  }
}
module.exports = {
  getFilteredProductsController,
  getProductsCountController,
  getSearchedProductsController,
  getProductByIDController
}
