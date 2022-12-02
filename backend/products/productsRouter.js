const express = require('express')
const router = express.Router()

const {
  getProductsFunction,
  getProductsInPartsFunction,
  getProductsCountFunction,
  getMatchingProductsFunction
} = require('./productsController')

router.get('/page', getProductsInPartsFunction)
router.get('/pages/:category', getProductsCountFunction)
router.get('/', getProductsFunction)
router.get('/matchingProducts/:keyword', getMatchingProductsFunction)

module.exports = router
