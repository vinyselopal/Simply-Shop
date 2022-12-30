const { Pool } = require('pg')
const {
  createUsersTable,
  createProductsTable,
  createOrdersMappingTable,
  createProductImagesTable,
  createSellersTable,
  createOrdersTable,
  createAddressesUsersMappingTable
} = require('./queries')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'amazon_clone',
  post: 5432
})

async function initDB () {
  await pool.query(createUsersTable)

  await pool.query(createSellersTable)

  await pool.query(createProductsTable)

  await pool.query(createProductImagesTable)

  await pool.query(createOrdersTable)

  await pool.query(createOrdersMappingTable)

  await pool.query(createAddressesUsersMappingTable)
}

module.exports = { initDB, pool }
