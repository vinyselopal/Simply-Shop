const express = require('express')
const app = express()
const cors = require('cors')

const productsRouter = require('./products/productsRouter')

const { pool, initDB } = require('./config/initDB.js')

let cart = null
app.use(express.json())
app.use(cors())

initDB()

const myLogger = (req, res, next) => {
  console.log(req)
  next()
}
app.use('/products', productsRouter)

app.get('/cart', (req, res) => {
  pool.query('SELECT cart FROM users WHERE id = 1;').then((response) => {
    if (!response.rows[0]) res.status(404)
    else {
      res.json(JSON.parse(response.rows[0].cart))
    }
  })
})

app.put('/cart', async (req, res) => {
  cart = JSON.parse(req.body.cart)

  await pool.query(`UPDATE users
    SET cart = $1 WHERE id = $2;`,
  [JSON.stringify(cart),
    req.body.userID])

  res.status(200)
})

app.listen(8000, () => console.log('server is running on port 8000'))
