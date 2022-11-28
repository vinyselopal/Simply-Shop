const express = require('express')
const app = express()
const cors = require('cors')

const { pool, initDB } = require('./config/initDB.js')

let cart = null
app.use(express.json())
app.use(cors())

initDB()

app.get('/products', async (req, res) => {
  const products = await pool.query(`select 
  products.id, products.name, products.category, 
  products.seller_id, products.description, 
  products.count, products.ratings, products.price,
  product_images.image_url 
  FROM 
  products INNER JOIN product_images 
  ON 
  products.id = product_images.product_id;
  `)
  console.log('products', products)
  if (!products.rows[0]) res.status(404)
  else {
    res.json(JSON.stringify(products.rows))
  }
})
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
