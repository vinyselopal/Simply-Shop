const express = require('express')
const router = express.Router()
const { getProductsFunction, getProductsInPartsFunction } = require('./productsController')
router.get('/page', getProductsInPartsFunction)
router.get('/', getProductsFunction)
module.exports = router
