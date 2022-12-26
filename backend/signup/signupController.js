const { validatePassword } = require('../utils')
const { validateEmail, insertUser } = require('./signupModel')
const bcrypt = require('bcrypt')

const saltRounds = 10

// use better pattern for validating fields
// validation response format (create a standard), json schema. error handling
const signupFunction = async (req, res) => { // {name suggestions: signupUser}
  const checkedUser = await validateEmail(req.body.email) // naming

  if (!checkedUser) {
    res.status(400).json('user already exists') // not a 400, why?
  } else {
    const validated = validatePassword(req.body.password) // return boolean
    if (validated === 'valid') {
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPass = await bcrypt.hash(req.body.password, salt)
      await insertUser(req.body.email, hashedPass)
      res.status(200).json(validated) // remove .status
    } else {
      res.status(400).json(validated)
    }
  }
}

module.exports = { signupFunction }
