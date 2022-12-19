const bcrypt = require('bcrypt')
const { loginCreds } = require('./loginModel')

const { generateAccessToken } = require('../utils.js')

const loginFunction = async (req, res) => {
  const creds = await loginCreds(req.body.userID)
  if (creds === undefined) {
    res.status(400).json('invalid username')
    res.end()
  } else {
    bcrypt.compare(req.body.password, creds.password, function (err, result) {
      if (err) throw err // look into implementation bcrypt
      if (!result) {
        res.status(400).json(creds)
      } else {
        const accessToken = generateAccessToken({
          user_id: creds.id
        })
        res.json({ accessToken })
      }
    })
  }
}

module.exports = { loginFunction }
