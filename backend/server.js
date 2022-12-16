const express = require('express')
const app = express()
const cors = require('cors')

const productsRouter = require('./products/productsRouter')
const cartRouter = require('./cart/cartRouter')
const loginRouter = require('./login/loginRouter')
const signupRouter = require('./signup/signupRouter')
const { initDB } = require('./config/initDB.js')

app.use(express.json())
app.use(cors())

initDB()

app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/login', loginRouter)
app.use('/register', signupRouter)

app.listen(8000, () => console.log('server is running on port 8000'))
