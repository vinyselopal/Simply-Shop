const { Pool } = require('pg')
const { faker } = require('@faker-js/faker')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'amazon_clone',
  post: 5432
})

async function createProductsData () {
  for (let i = 0; i < 20; i++) {
    const obj = {

      description: faker.random.word(),
      // id: i+1,
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
      image: faker.datatype.number(
        {
          min: 1,
          max: 20
        }
      ),
      category_id: faker.datatype.number(
        {
          min: 1,
          max: 20
        }
      ),
      seller_id: faker.datatype.number(
        {
          min: 1,
          max: 20
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
            INSERT INTO products (price, category_id, description, name, count, image, seller_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [obj.price, obj.category_id, obj.description, obj.name, obj.quantity, obj.image, obj.seller_id])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

async function createProductImagesData () {
  for (let i = 0; i < 20; i++) {
    const obj = {
      url: faker.image.imageUrl()
    }
    try {
      const response = await pool.query(`
            INSERT INTO product_images (image_url) 
            VALUES ($1);`,
      [obj.url])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

async function createUsersData () {
  for (let i = 0; i < 20; i++) {
    const obj = {
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
            (first_name, last_name, password, email_address, address, created_at)
             VALUES ($1, $2, $3, $4, $5, $6);`,
      [obj.first_name, obj.last_name, obj.password, obj.email_address, obj.address, obj.created_at])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}
async function createOrdersData () {
  for (let i = 0; i < 20; i++) {
    const obj = {

      product_id: faker.datatype.number(
        {
          min: 81,
          max: 100
        }
      ),
      user_id: faker.datatype.number(
        {
          min: 1,
          max: 20
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

async function createProductImagesMappingData () {
  for (let i = 0; i < 20; i++) {
    const obj = {
      image_id: faker.datatype.number(
        {
          min: 1,
          max: 20
        }
      ),
      product_id: faker.datatype.number(
        {
          min: 81,
          max: 100
        }
      )
    }
    try {
      const response = await pool.query(`
            INSERT INTO product_images_mapping (image_id, product_id) 
            VALUES ($1, $2);`,
      [obj.image_id, obj.product_id])
      console.log(response)
    } catch (err) {
      console.log('data', obj, 'err', err)
    }
  }
}

async function createSellersData () {
  for (let i = 0; i < 20; i++) {
    const obj = {

      company_name: faker.random.word(),
      email_address: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      created_at: faker.datatype.datetime()
    }
    try {
      const response = await pool.query(`
            INSERT INTO sellers (company_name, email_address, password, address, created_at) 
            VALUES ($1, $2, $3, $4, $5);`,
      [obj.company_name, obj.email_address, obj.password, obj.address, obj.created_at])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

async function createCategoriesData () {
  for (let i = 0; i < 20; i++) {
    const obj = {
      name: faker.random.word()

    }
    try {
      const response = await pool.query(`
            INSERT INTO categories (name) 
            VALUES ($1);`,
      [obj.name])
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

// createProductImagesData()
// createProductsData()
// createOrdersData()

createProductsData()
module.exports = { createProductsData, createUsersData, createOrdersData, createProductImagesData, createProductImagesMappingData, createSellersData, createCategoriesData }
