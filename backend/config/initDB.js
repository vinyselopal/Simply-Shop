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

require('dotenv').config()

const pool = new Pool({
  user: process.env.dbUser,
  host: process.env.dbHost,
  database: process.env.database,
  port: process.env.port
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
