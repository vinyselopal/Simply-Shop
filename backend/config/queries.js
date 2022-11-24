const createUsersTable = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name text, last_name text, password text, email_address text, address text, created_at timestamp);`
const createProductsTable = `CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name text, category text, description text, price numeric CHECK(price > 0), image text, count integer CHECK(count > 0));`
const createOrdersTable = `CREATE TABLE IF NOT EXISTS orders (id SERIAL PRIMARY KEY, product_id integer REFERENCES products(id), user_id integer REFERENCES users(id), created_at timestamp);`

module.exports = {createOrdersTable, createUsersTable, createProductsTable}