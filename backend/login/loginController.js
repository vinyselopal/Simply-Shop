const { getLoginCredsFromDB } = require('./loginModel')
const { generateAccessToken, comparePasswords } = require('../utils.js')

const responseMap = {
  invalidEmail: {
    statusCode: 404,
    message: 'invalid email'
  },
  serverError: {
    statusCode: 500,
    message: 'server error'
  },
  invalidUsername: {
    statusCode: 404,
    message: 'invalid username'
  }
}
const loginUserController = async (req, res) => {
  const creds = await getLoginCredsFromDB(req.body.email)

  if (!creds) {
    return res.status(responseMap.invalidEmail.statusCode)
      .json(responseMap.invalidEmail.message) // create a function
  }
  if (creds instanceof Error) {
    return res.status(responseMap.serverError.statusCode)
      .json(responseMap.serverError.message)
  }

  try {
    if (await comparePasswords(req.body.password, creds.password)) {
      const accessToken = generateAccessToken({
        userID: creds.id,
        email: req.body.email
        // other info
      })
      return res.cookie('accessToken', accessToken, { httpOnly: true })
        .json('logged in successfully')
    }
    res.status(responseMap.invalidPassword.statusCode)
      .json(responseMap.invalidPassword.message)
  } catch (err) {
    res.status(responseMap.serverError.statusCode)
      .json(responseMap.serverError.message)
  }
}

module.exports = { loginUserController }
