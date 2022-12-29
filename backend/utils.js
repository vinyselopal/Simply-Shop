require('dotenv').config()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const config = require('./auth.config')
const bcrypt = require('bcrypt')

const user = config.user
const pass = config.pass

function generateAccessToken (obj) {
  const accessToken = jwt.sign(obj, process.env.ACCESS_TOKEN, { expiresIn: '3000s' })
  return accessToken
}

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass
  }
})

const sendConfirmationEmail = (email) => {
  console.log('Check')
  const token = generateAccessToken({ email })
  transport.sendMail({
    from: user,
    to: email,
    subject: 'Please confirm your account',
    html: `<h1>Email Confirmation</h1>
        <h2>Hello</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8000/register/confirm/${token}> Click here</a>
        </div>`
  }).catch(err => console.log(err))
}

async function getHashedPassword (password) {
  const saltRounds = 10

  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

function jwtAuthMiddleware (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // send 401 when authHeader not valid

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => { // promisify
    if (err) return res.sendStatus(403) // 401.
    req.userId = result.user_id // change this to email
    next()
  })
}

function confirmationAuth (req, res, next) {
  const { token } = req.params
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => { // promisify
    if (err) return res.sendStatus(403) // 401.
    req.email = result.email// change this to email
    next()
  })
}

module.exports = { generateAccessToken, sendConfirmationEmail, getHashedPassword, jwtAuthMiddleware, confirmationAuth }
