const { checkEmailAlreadyRegistered, insertUser, changeUserStatus } = require('./signupModel')
const { sendConfirmationEmail, getHashedPassword } = require('../utils')

const responses = {
  emailAlreadyRegistered: {
    statusCode: 409,
    message: 'email already registered'
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

const confirmUser = async (req, res) => {
  const email = req.email
  const userConfirmed = await changeUserStatus(email)

  if (userConfirmed instanceof Error) {
    return res.status(responses.serverError.statusCode)
      .json({ message: responses.serverError.message })
  }

  res.status(responses.registrationSuccessful.statusCode)
    .json({ message: responses.registrationSuccessful.message })
}

const registerUser = async (req, res) => {
  const emailExists = await checkEmailAlreadyRegistered(req.body.email)

  if (emailExists instanceof Error) {
    return res.status(responses.serverError.statusCode)
      .json({ message: responses.serverError.message })
  }
  if (emailExists) {
    return res.status(responses.emailAlreadyRegistered.statusCode)
      .json({ message: responses.emailAlreadyRegistered.message })
  }

  const hashedPassword = await getHashedPassword(req.body.password)
  const userInserted = await insertUser(req.body.email, hashedPassword)

  if (userInserted instanceof Error) {
    return res.status(responses.serverError.statusCode)
      .json({ message: responses.serverError.message })
  }

  const emailConfirmationResponse = await sendConfirmationEmail(req.body.email)

  if (emailConfirmationResponse instanceof Error) {
    return res.status(responses.emailConfirmationFailed.statusCode)
      .json({ message: responses.emailConfirmationFailed.message })
  }

  return res.status(responses.emailConfirmationSent.statusCode)
    .json({ message: responses.emailConfirmationSent.message })
}

module.exports = { registerUser, confirmUser }
