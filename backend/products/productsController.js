const { getProductsQuery, getProductsInPartsQuery, getProductsCountQuery, getMatchingProductsQuery } = require('./productsModel')
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

const getProductsCountFunction = async (req, res) => {
  console.log('in count')
  const { category } = req.params
  const response = await pool.query(getProductsCountQuery(category))
  const count = response.rows[0].count
  if (!count) res.status(404)
  else {
    res.json(count)
  }
}

const getMatchingProductsFunction = async (req, res) => {
  console.log('get matching products query')
  const { keyword } = req.params
  const response = await pool.query(getMatchingProductsQuery(keyword))
  console.log('db response', response)
  const count = response.rows
  if (!count) res.status(404)
  else {
    res.json(count)
  }
}

module.exports = { getProductsFunction, getProductsInPartsFunction, getProductsCountFunction, getMatchingProductsFunction }
