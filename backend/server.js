const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const productsRouter = require('./products/productsRouter')
const cartRouter = require('./cart/cartRouter')
const loginRouter = require('./login/loginRouter')
const signupRouter = require('./signup/signupRouter')
const ordersRouter = require('./orders/ordersRouter.js')

const { initDB } = require('./config/initDB.js')

require('dotenv').config()

app.use(express.json())
app.use(cors())

initDB()

function jwtAuthMiddleware (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, result) => {
    if (err) return res.sendStatus(403)
    req.userId = result.user_id
    next()
  })
}

app.use('/products', productsRouter)
app.use('/cart', jwtAuthMiddleware, cartRouter)
app.use('/orders', jwtAuthMiddleware, ordersRouter)
app.use('/login', loginRouter)
app.use('/register', signupRouter)

app.listen(8000, () => console.log('server is running on port 8000'))
