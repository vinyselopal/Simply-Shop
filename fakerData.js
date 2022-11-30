const { Pool } = require('pg')
const { faker } = require('@faker-js/faker')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'amazon_clone',
  post: 5432
})
const categories = ['clothes', 'electronics', 'home-appliances']
async function createProductsData () {
  for (let i = 0; i < 200; i++) {
    const obj = {

      description: faker.random.word(),
      id: i + 1,
      name: faker.random.word(),
      price: faker.datatype.number(
        {
          min: 100,
          max: 1000
        }
      ),
      quantity: faker.datatype.number(
        {
          min: 0,
          max: 50
        }

      ),

      category: categories[faker.datatype.number(
        {
          min: 0,
          max: 2
        }
      )],
      seller_id: faker.datatype.number(
        {
          min: 1,
          max: 200
        }
      ),
      ratings: faker.datatype.float(
        {
          min: 0,
          max: 5
        }
      )

    }
    try {
      const response = await pool.query(`
            INSERT INTO products (price, category, description, name, count, seller_id, ratings, id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [obj.price, obj.category, obj.description, obj.name, obj.quantity, obj.seller_id, obj.ratings, obj.id])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

async function createProductImagesData () {
  for (let i = 0; i < 200; i++) {
    const obj = {
      id: i + 1,
      url: faker.image.image(),
      product_id: faker.datatype.number(
        {
          min: 1,
          max: 200
        }
      )
    }
    try {
      const response = await pool.query(`
            INSERT INTO product_images (id, image_url, product_id) 
            VALUES ($1, $2, $3);`,
      [obj.id, obj.url, obj.product_id])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

async function createUsersData () {
  for (let i = 0; i < 200; i++) {
    const obj = {
      id: i + 1,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password: faker.internet.password(),
      email_address: faker.internet.email(),
      address: faker.address.streetAddress(),
      created_at: faker.datatype.datetime()
    }
    try {
      const response = await pool.query(`
            INSERT INTO users 
            (first_name, last_name, password, email_address, address, created_at, id)
             VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [obj.first_name, obj.last_name, obj.password, obj.email_address, obj.address, obj.created_at, obj.id])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

async function createOrdersData () {
  for (let i = 0; i < 200; i++) {
    const obj = {

      product_id: faker.datatype.number(
        {
          min: 1,
          max: 200
        }
      ),
      user_id: faker.datatype.number(
        {
          min: 1,
          max: 200
        }
      ),

      created_at: faker.datatype.datetime()
    }
    try {
      const response = await pool.query(`
            INSERT INTO orders (product_id, user_id, created_at) 
            VALUES ($1, $2, $3);`,
      [obj.product_id, obj.user_id, obj.created_at])

      console.log(response)
    } catch (err) {
      console.log('data', obj, 'err', err)
    }
  }
}

async function createSellersData () {
  for (let i = 0; i < 200; i++) {
    const obj = {
      id: i + 1,
      company_name: faker.random.word(),
      email_address: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      created_at: faker.datatype.datetime()
    }
    try {
      const response = await pool.query(`
            INSERT INTO sellers (company_name, email_address, password, address, created_at, id) 
            VALUES ($1, $2, $3, $4, $5, $6);`,
      [obj.company_name, obj.email_address, obj.password, obj.address, obj.created_at, obj.id])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

// createUsersData()
// createSellersData()
// createProductsData()
// createProductImagesData()
// createOrdersData()

// const createDataArr = [createUsersData, createSellersData, createProductsData, createProductImagesData, createOrdersData]

module.exports = { createProductsData, createUsersData, createOrdersData, createProductImagesData, createSellersData }
