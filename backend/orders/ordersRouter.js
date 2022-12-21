const express = require('express')
const router = express.Router()

const {
  createOrderFunction,
  deleteOrderFunction
} = require('./ordersController')

router.post('/', createOrderFunction)
router.delete('/:orderID', deleteOrderFunction)
module.exports = router
