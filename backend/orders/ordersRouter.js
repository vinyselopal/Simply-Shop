const express = require('express')
const router = express.Router()

const {
  createOrderController,
  deleteOrderController,
  getOrderController
} = require('./ordersController')

router.get('/', getOrderController)
router.post('/', createOrderController)
router.delete('/:orderID', deleteOrderController)
module.exports = router
