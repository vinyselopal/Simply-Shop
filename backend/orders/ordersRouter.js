const express = require('express')
const router = express.Router()

const {
  createOrderFunction
} = require('./ordersController')

router.post('/', createOrderFunction)

module.exports = router
