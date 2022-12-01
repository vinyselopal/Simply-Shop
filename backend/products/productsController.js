const { getProductsQuery, getProductsInPartsQuery } = require('./productsModel')
const { pool } = require('../config/initDB')
const getProductsFunction = async (req, res) => {
  console.log('in base route', req.url)
  const products = await pool.query(getProductsQuery)
  if (!products.rows[0]) res.status(404)
  else {
    res.json(JSON.stringify(products.rows))
  }
}

const getProductsInPartsFunction = async (req, res) => {
  console.log('in parts')
  const { page, category } = req.query
  console.log('page', page, 'category', category)
  const products = await pool.query(getProductsInPartsQuery(page, category))
  if (!products.rows[0]) res.status(404)
  else {
    res.json(JSON.stringify(products.rows))
  }
}

module.exports = { getProductsFunction, getProductsInPartsFunction }
