const express = require('express')

const signupRouter = express.Router()
const { signupFunction } = require('./signupController')

signupRouter.post('/', signupFunction)

module.exports = signupRouter
