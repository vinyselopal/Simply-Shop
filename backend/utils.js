require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken (obj) {
  console.log("payload", obj)
  const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN, { expiresIn: '3000s' })
  return accessToken
}

function validatePassword (password) {
  // if (password.length < 8) return 'password too short'
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  if (!regex.test(password)) return 'password invalid'
  return 'valid'
}

module.exports = { generateAccessToken, validatePassword }
