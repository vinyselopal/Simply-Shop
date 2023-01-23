const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('pino-http')()
const path = require('node:path')

const productsRouter = require('./products/productsRouter')
const cartRouter = require('./cart/cartRouter')
const loginRouter = require('./login/loginRouter')
const signupRouter = require('./signup/signupRouter')
const ordersRouter = require('./orders/ordersRouter.js')
const addressesRouter = require('./addresses/addressesRouter.js')
const { jwtAuthMiddleware, logoutHandler } = require('./utils')
const { initDB } = require('./config/initDB.js')

require('dotenv').config()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3000/products', 'http://localhost:3000/cart'],
  credentials: true
}))
app.use(express.json())

app.use(cookieParser())

app.use((req, res, next) => {
  console.log('in middleware', req.url)
  logger(req, res)
  req.log.info('in a custom middleware')
  next()
})

initDB()
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))
app.use('/products', productsRouter)
app.use('/cart', jwtAuthMiddleware, cartRouter)
app.use('/orders', jwtAuthMiddleware, ordersRouter)
app.use('/api/login', loginRouter)
app.get('/api/logout', logoutHandler)
app.use('/api/register', signupRouter)
app.use('/addresses', jwtAuthMiddleware, addressesRouter)

app.listen(8000, () => console.log('server is running on port 8000'))
