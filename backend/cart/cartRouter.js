const express = require('express')
const router = express.Router()

const { getCartFunction, putCartFunction } = require('./cartController')
router.get('/', getCartFunction)

router.put('/', putCartFunction)

module.exports = router
