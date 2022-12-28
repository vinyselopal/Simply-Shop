const express = require('express')

const signupRouter = express.Router()
const { registerUser } = require('./signupController')

signupRouter.post('/', registerUser)

module.exports = signupRouter
