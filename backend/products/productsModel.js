const { pool } = require('../config/initDB')

const getFilteredProductsASCFromDB = async (page, category, order, sortby) => {
  const offset = (page - 1) * 10
  const response = await pool.query(
    `
    SELECT * FROM (
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
      ORDER BY products.id
      ) p ORDER BY p.${sortby} ${order}  LIMIT 10 OFFSET $2;
  `
    , [category, offset])
  return response.rows
}

const getProductsCountFromDB = async (category) => {
  const response = await pool.query(
    `
  SELECT COUNT (*) FROM products 
    WHERE products.category = $1`
    , [category])
  return response.rows[0].count
}

const getSearchedProductsFromDB = async (keywords) => {
  const response = await pool.query(
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
  
      WHERE products.name ILIKE any ($1) ;
    `
    , [keywords.map((keyword, index) => {
      if (index === 0) {
        return `${keyword}%`
      }
      return `% ${keyword}%`
    })])

  return response.rows
}

module.exports = {
  getFilteredProductsASCFromDB,
  getProductsCountFromDB,
  getSearchedProductsFromDB
}
