const express = require('express')
const router = express.Router()

const {
  createOrderController,
  deleteOrderController
} = require('./ordersController')

router.post('/', createOrderController)
router.delete('/:orderID', deleteOrderController)
module.exports = router
