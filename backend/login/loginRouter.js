const express = require('express')
const { loginUser } = require('./loginController')
const loginRouter = express.Router()

loginRouter.post('/', loginUser)

module.exports = loginRouter
