const express = require('express')
const router = express.Router()

const { getUserAddresses } = require('./addressesController')
router.get('/', getUserAddresses)

module.exports = router
