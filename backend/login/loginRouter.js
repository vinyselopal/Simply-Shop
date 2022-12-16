const express = require('express')
const { loginFunction } = require('./loginController')
const loginRouter = express.Router()

loginRouter.post('/', loginFunction)

module.exports = loginRouter
