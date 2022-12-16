const { validatePassword } = require('../utils')
const { validateEmail, insertUser } = require('./signupModel')
const bcrypt = require('bcrypt')

const saltRounds = 10

const signupFunction = async (req, res) => {
  const checkedUser = await validateEmail(req.body.email)

  if (!checkedUser) {
    res.status(400).json('user already exists')
    res.end()
  } else {
    const validated = validatePassword(req.body.password)
    if (validated === 'valid') {
      const saltedPass = await bcrypt.genSalt(saltRounds)
      const hashedPass = await bcrypt.hash(req.body.password, saltedPass)
      await insertUser(req.body.email, hashedPass)
      res.status(200).json(validated)
    } else {
      res.status(400).json(validated)
    }
  }
}

module.exports = { signupFunction }
