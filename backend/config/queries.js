const createUsersTable = `CREATE TABLE IF NOT EXISTS users 
(id SERIAL PRIMARY KEY, 
    first_name text, 
    last_name text, 
    password text,
     email_address text, 
     address text, 
     created_at timestamp, 
     cart text,
     status text
);`

// updated_at field (standard across tables), expected_delivery, values and not references for orders
const createOrdersTable = `CREATE TABLE IF NOT EXISTS orders
(id SERIAL PRIMARY KEY, 
    user_id integer REFERENCES users(id), 
    payment_status boolean NOT NULL,
    deadline date,
    payment_amount numeric CHECK(payment_amount > 0),
    created_at timestamp,
    updated_at timestamp
);`

// no sellers
const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products 
    (id SERIAL PRIMARY KEY, 
    name text, 
    category text, 
    seller_id integer REFERENCES sellers(id), 
    description text, 
    price numeric CHECK(price > 0), 
    count integer CHECK(count > 0), 
    ratings decimal CHECK(ratings <= 5 AND ratings >= 0)
);`

const createProductImagesTable = `
    CREATE TABLE IF NOT EXISTS product_images 
    (id SERIAL PRIMARY KEY, 
    image_url text, 
    product_id integer REFERENCES products(id)
);`

const createOrdersMappingTable = `
    CREATE TABLE IF NOT EXISTS orders_mapping
    (order_id integer REFERENCES orders(id), 
    product_id integer REFERENCES products(id)
);`

const createSellersTable = `CREATE TABLE IF NOT EXISTS sellers 
(id SERIAL PRIMARY KEY, 
    company_name text, 
    email_address text, 
    address text, 
    created_at timestamp, 
    password text
);`

const createCategoriesTable = `CREATE TABLE IF NOT EXISTS categories 
(id SERIAL PRIMARY KEY, 
    name text
);`

const createAddressesUsersMappingTable = `CREATE TABLE IF NOT EXISTS addresses_users_mapping
(address text,
    user_id integer REFERENCES users(id)
);`

module.exports = {
  createOrdersMappingTable,
  createUsersTable,
  createProductsTable,
  createProductImagesTable,
  createSellersTable,
  createCategoriesTable,
  createOrdersTable,
  createAddressesUsersMappingTable
}
