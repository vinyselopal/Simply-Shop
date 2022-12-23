const express = require('express')
const router = express.Router()

const {
  getProductsFunction,
  getProductsInPartsFunction,
  getProductsCountFunction,
  getMatchingProductsFunction
} = require('./productsController')

router.get('/page', getProductsInPartsFunction) // ?limit=10&offset=10
router.get('/pages/:category', getProductsCountFunction) // eliminate
router.get('/', getProductsFunction) // /
router.get('/matchingProducts/:keyword', getMatchingProductsFunction) // ?keyword=bla

// filters: ?price[gte]=10&price[lte]=100
// sort   : ?sortby=+price
//        : ?sortby=-price

module.exports = router
