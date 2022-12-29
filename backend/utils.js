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

function logoutHandler (req, res, next) {
  res.clearCookie('accessToken')
  res.sendStatus(200)
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
  console.log('in jwt middleware', req.cookies)
  const token = req.cookies.accessToken
  if (!token) return res.sendStatus(403)

  try {
    const result = jwt.verify(token, process.env.ACCESS_TOKEN)
    console.log(result)
    req.email = result.email // change this to email
    req.userID = result.userID
    console.log('inside jwtAuth', result)
  } catch (err) {
    console.log('in jwt err', err)
    return res.sendStatus(401)
  }
  next()
}

function confirmationAuth (req, res, next) {
  const { token } = req.params
  try {
    const result = jwt.verify(token, process.env.ACCESS_TOKEN)
    req.email = result.email
    next()
  } catch (err) {
    return res.sendStatus(401)
  }
}

async function comparePasswords (loginPassword, storedPassword) {
  await bcrypt.compare(loginPassword, storedPassword)
}

module.exports = {
  generateAccessToken,
  sendConfirmationEmail,
  getHashedPassword,
  jwtAuthMiddleware,
  confirmationAuth,
  comparePasswords,
  logoutHandler
}
