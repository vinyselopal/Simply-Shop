require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken (obj) {
  const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN, { expiresIn: '3000s' })
  return accessToken
}

function validatePassword (password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  if (!regex.test(password)) return 'password invalid'
  return 'valid'
}

module.exports = { generateAccessToken, validatePassword }
