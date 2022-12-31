const express = require('express')
const { loginUserController } = require('./loginController')
const loginRouter = express.Router()

loginRouter.post('/', loginUserController)

module.exports = loginRouter
