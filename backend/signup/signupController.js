const { checkEmailAlreadyRegistered, insertUser } = require('./signupModel')
const bcrypt = require('bcrypt')
const config = require('../auth.config')

const nodemailer = require('nodemailer')
const saltRounds = 10

const user = config.user
const pass = config.pass

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass
  }
})

const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log('Check')
  transport.sendMail({
    from: user,
    to: email,
    subject: 'Please confirm your account',
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8000/signup/confirm/${confirmationCode}> Click here</a>
        </div>`
  }).catch(err => console.log(err))
}

const responses = {
  emailAlreadyRegistered: {
    statusCode: 409,
    message: 'email already registered'
  },
  registrationSuccessful: {
    statusCode: 201,
    message: 'registration successful'
  },
  emailConfirmationSent: {
    statusCode: 202,
    message: 'email confirmation sent'
  },
  emailConfirmationFailed: {
    statusCode: 400, // change this
    message: 'email confirmation failed'
  },
  serverError: {
    statusCode: 500,
    message: 'Server error'
  }
}

const registerUser = async (req, res) => {
  console.log('registerRouter')
  const emailExists = await checkEmailAlreadyRegistered(req.body.email)

  if (emailExists instanceof Error) {
    return res.status(responses.serverError.statusCode)
      .json(responses.serverError.message)
  }
  if (emailExists) {
    return res.status(responses.emailAlreadyRegistered.statusCode)
      .json(responses.emailAlreadyRegistered.message)
  }

  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const userInserted = await insertUser(req.body.email, hashedPassword)

  if (userInserted instanceof Error) {
    return res.status(responses.serverError.statusCode)
      .json(responses.serverError.message)
  }

  const emailConfirmationResponse = await sendConfirmationEmail('viny', 'viny0698@gmail.com', 'secret')

  if (emailConfirmationResponse instanceof Error) {
    return res.status(responses.emailConfirmationFailed.statusCode)
      .json(responses.emailConfirmationFailed.message)
  }

  return res.status(responses.emailConfirmationSent.statusCode)
    .json(responses.emailConfirmationSent.message)

  // res.status(responses.registrationSuccessful.statusCode)
  //   .json(responses.registrationSuccessful.message)
}

module.exports = { registerUser }
