const express = require('express')
const app = express()
const cors = require('cors')
// const pino = require('express-pino-logger')
const productsRouter = require('./products/productsRouter')
const cartRouter = require('./cart/cartRouter')
const loginRouter = require('./login/loginRouter')
const signupRouter = require('./signup/signupRouter')
const ordersRouter = require('./orders/ordersRouter.js')
const { jwtAuthMiddleware } = require('./utils')
const { initDB } = require('./config/initDB.js')

require('dotenv').config()

// app.use(pino)
app.use(express.json())

app.use((req, res, next) => {
  console.log('in middleware', req.body)
  next()
})

app.use(cors())

initDB()

app.use('/products', productsRouter)
app.use('/cart', jwtAuthMiddleware, cartRouter)
app.use('/orders', jwtAuthMiddleware, ordersRouter)
app.use('/login', loginRouter)
app.use('/register', signupRouter)

app.listen(8000, () => console.log('server is running on port 8000'))
