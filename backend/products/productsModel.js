const { pool } = require('../config/initDB')

const getProductsFromDB = async () => {
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

const getFilteredProductsASCFromDB = async (page, category, order, sortby) => {
  const offset = (page - 1) * 10
  return await pool.query(
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
}

const getProductsCountFromDB = async (category) => {
  return await pool.query(
    `
  SELECT COUNT (*) FROM products 
    WHERE products.category = $1`
    , [category])
}

const getSearchedProductsFromDB = async (keywords) => {
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
  
      WHERE products.name ILIKE any ($1) ;
    `
    , [keywords.map((keyword, index) => {
      console.log(index, `% ${keyword}%`, `${keyword}%`)
      if (index === 0) {
        console.log('zero')
        return `${keyword}%`
      }
      console.log('not zero')
      return `% ${keyword}%`
    })])
}

module.exports = {
  getProductsFromDB,
  getFilteredProductsASCFromDB,
  getProductsCountFromDB,
  getSearchedProductsFromDB
}
