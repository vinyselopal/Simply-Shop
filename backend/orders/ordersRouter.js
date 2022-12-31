const express = require('express')
const router = express.Router()

const {
  createOrderController,
  deleteOrderController,
  orderPlacementController
} = require('./ordersController')

router.post('/', createOrderController)
router.delete('/:orderID', deleteOrderController)
router.put('/:orderID/placement', orderPlacementController)
module.exports = router
