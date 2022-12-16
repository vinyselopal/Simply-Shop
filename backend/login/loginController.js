const bcrypt = require('bcrypt')
const { loginCreds } = require('./loginModel')

const { generateAccessToken } = require('../utils.js')

const loginFunction = async (req, res) => {
  console.log('in login')
  const creds = await loginCreds(req.body.userID)
  if (creds === undefined) {
    res.status(400).json('invalid username')
    res.end()
  } else {
    bcrypt.compare(req.body.password, creds.password, function (err, result) {
      console.log('result of bcrypt compare', result, creds.password)
      if (err) throw err
      if (!result) {
        res.status(400).json(creds)
      } else {
        const accessToken = generateAccessToken({ user_id: creds.user_id })
        console.log('inside login auth')
        res.json({ accessToken })
      }
    })
  }
}

module.exports = { loginFunction }
