const { checkEmailAlreadyRegistered, insertUser } = require('./signupModel')
const bcrypt = require('bcrypt')

const saltRounds = 10

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
  res.status(responses.registrationSuccessful.statusCode)
    .json(responses.registrationSuccessful.message)
}

module.exports = { registerUser }
