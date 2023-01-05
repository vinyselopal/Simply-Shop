const express = require('express')
const router = express.Router()

const {
  getFilteredProductsController,
  getProductsCountController,
  getSearchedProductsController,
  getProductByIDController
} = require('./productsController')

router.get('/', getFilteredProductsController) // ?limit=10&offset=10
router.get('/product/:productID', getProductByIDController)
router.get('/:category', getProductsCountController) // eliminate
router.get('/matchingProducts/:keywords', getSearchedProductsController) // ?keyword=bla

// filters: ?price[gte]=10&price[lte]=100
// sort   : ?sortby=+price
//        : ?sortby=-price

module.exports = router
