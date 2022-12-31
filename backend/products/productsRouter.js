const express = require('express')
const router = express.Router()

const {
  getProductsController,
  getFilteredProductsController,
  getProductsCountController,
  getSearchedProductsController
} = require('./productsController')

router.get('/page', getFilteredProductsController) // ?limit=10&offset=10
router.get('/pages/:category', getProductsCountController) // eliminate
router.get('/', getProductsController) // /
router.get('/matchingProducts/:keywords', getSearchedProductsController) // ?keyword=bla

// filters: ?price[gte]=10&price[lte]=100
// sort   : ?sortby=+price
//        : ?sortby=-price

module.exports = router
