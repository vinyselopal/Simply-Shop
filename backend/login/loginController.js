const bcrypt = require('bcrypt')
const { loginCreds } = require('./loginModel')

const { generateAccessToken } = require('../utils.js')

const loginFunction = async (req, res) => {
  const creds = await loginCreds(req.body.userID) // email as field from client, not id
  if (!creds) {
    res.status(400).json('invalid username') // user not found => 404, adding return avoids else requirement
  } else {
    bcrypt.compare(req.body.password, creds.password, function (err, result) { // use promises
      if (err) throw err // either err or !result
      if (!result) {
        res.status(400).json(creds) // response format
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
