const createUsersTable = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name text, last_name text, password text, email_address text, address text, created_at timestamp, cart text);'
const createProductsTable = 'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name text, category_id integer REFERENCES categories(id), seller_id integer REFERENCES sellers(id), description text, price numeric CHECK(price > 0), image integer REFERENCES product_images(id), count integer CHECK(count > 0), ratings decimal CHECK(ratings <= 5 AND ratings >= 0));'
const createProductImagesTable = 'CREATE TABLE IF NOT EXISTS product_images (id SERIAL PRIMARY KEY, image_url text);'
const createOrdersTable = 'CREATE TABLE IF NOT EXISTS orders (id SERIAL PRIMARY KEY, product_id integer REFERENCES products(id), user_id integer REFERENCES users(id), created_at timestamp);'
const createProductImagesMappingTable = 'CREATE TABLE IF NOT EXISTS product_images_mapping (product_id integer REFERENCES products(id), image_id integer REFERENCES product_images(id));'
const createSellersTable = 'CREATE TABLE IF NOT EXISTS sellers (id SERIAL PRIMARY KEY, company_name text, email_address text, address text, created_at timestamp, password text);'
const createCategoriesTable = 'CREATE TABLE IF NOT EXISTS categories (id SERIAL PRIMARY KEY, name text);'

module.exports = { createOrdersTable, createUsersTable, createProductsTable, createProductImagesTable, createProductImagesMappingTable, createSellersTable, createCategoriesTable }
