const getProductsQuery = `
    SELECT DISTINCT ON (products.id)
    products.id, products.name, products.category, 
    products.seller_id, products.description, 
    products.count, products.ratings, products.price,
    product_images.image_url 
    FROM 
    products LEFT JOIN product_images 
    ON 
    products.id = product_images.product_id;
`

const getProductsInPartsQuery = (page, category) => {
  return `SELECT DISTINCT ON(products.id)
    products.id, products.name, products.category, 
    products.seller_id, products.description, 
    products.count, products.ratings, products.price,
    product_images.image_url 
    FROM 
    products LEFT JOIN product_images 
    ON 
    products.id = product_images.product_id 
    WHERE products.category = '${category}'
    ORDER BY products.id LIMIT 10 OFFSET ${(page - 1) * 10} ;
`
}

const getProductsCountQuery = (category) => {
  return `
SELECT COUNT (*) FROM products 
WHERE products.category = '${category}'`
}

const getMatchingProductsQuery = (keyword) => {
  return `
  SELECT DISTINCT ON (products.id)
    products.id, products.name, products.category, 
    products.seller_id, products.description, 
    products.count, products.ratings, products.price,
    product_images.image_url 
    FROM 
    products LEFT JOIN product_images 
    ON 
    products.id = product_images.product_id
    WHERE products.name = '${keyword}';`
}
module.exports = { getProductsQuery, getProductsInPartsQuery, getProductsCountQuery, getMatchingProductsQuery }
