const express = require('express')
const { confirmationAuth } = require('../utils')
const signupRouter = express.Router()
const { registerUser, confirmUser } = require('./signupController')

signupRouter.post('/', registerUser)
signupRouter.get('/confirm/:token', confirmationAuth, confirmUser)
module.exports = signupRouter
