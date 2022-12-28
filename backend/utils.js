require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateAccessToken (obj) {
  const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN, { expiresIn: '3000s' })
  return accessToken
}

module.exports = { generateAccessToken }
