const express = require('express')
const router = express.Router()

const {
  createOrderFunction,
  deleteOrderFunction,
  orderPlacement
} = require('./ordersController')

router.post('/', createOrderFunction)
router.delete('/:orderID', deleteOrderFunction)
router.put('/:orderID/placement', orderPlacement)
module.exports = router
