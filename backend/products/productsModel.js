const getProductsQuery = `select 
    products.id, products.name, products.category, 
    products.seller_id, products.description, 
    products.count, products.ratings, products.price,
    product_images.image_url 
    FROM 
    products INNER JOIN product_images 
    ON 
    products.id = product_images.product_id;
`

const getProductsInPartsQuery = (page, category) => {
  return `select 
    products.id, products.name, products.category, 
    products.seller_id, products.description, 
    products.count, products.ratings, products.price,
    product_images.image_url 
    FROM 
    products INNER JOIN product_images 
    ON 
    products.id = product_images.product_id 
    WHERE products.category = '${category}'
    ORDER BY products.id LIMIT 10 OFFSET ${(page - 1) * 10} ;
`
}
module.exports = { getProductsQuery, getProductsInPartsQuery }
