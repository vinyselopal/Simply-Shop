const { pool } = require('../config/initDB')

const getProductsQuery = async () => {
  return await pool.query(
  `
      SELECT DISTINCT ON (products.id)
      products.id, products.name, products.category, 
      products.seller_id, products.description, 
      products.count, products.ratings, products.price,
      product_images.image_url 
  
      FROM 
      products LEFT JOIN product_images 
  
      ON 
      products.id = product_images.product_id;
  `)
}

const getProductsInPartsQuery = async (page, category) => {
  const offset = (page - 1) * 10
  return await pool.query(
    `
    SELECT DISTINCT ON(products.id)
      products.id, products.name, products.category, 
      products.seller_id, products.description, 
      products.count, products.ratings, products.price,
      product_images.image_url 
  
      FROM 
      products LEFT JOIN product_images 
  
      ON 
      products.id = product_images.product_id 
  
      WHERE products.category = $1
      ORDER BY products.id LIMIT 10 OFFSET $2 ;
  `
    , [category, offset])
}

const getProductsCountQuery = async (category) => {
  return await pool.query(
    `
  SELECT COUNT (*) FROM products 
    WHERE products.category = $1`
    , [category])
}

const getMatchingProductsQuery = async (keyword) => {
  return await pool.query(
    `
    SELECT DISTINCT ON (products.id)
      products.id, products.name, products.category, 
      products.seller_id, products.description, 
      products.count, products.ratings, products.price,
      product_images.image_url 
  
      FROM 
      products LEFT JOIN product_images 
  
      ON 
      products.id = product_images.product_id
  
      WHERE products.name ILIKE any (array[$1, $2]) ;
    `
    , [`${keyword}%`, `% ${keyword}%`])
}

module.exports = {
  getProductsQuery,
  getProductsInPartsQuery,
  getProductsCountQuery,
  getMatchingProductsQuery
}
