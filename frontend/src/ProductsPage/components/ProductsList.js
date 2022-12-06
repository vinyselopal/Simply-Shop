import { Link } from 'react-router-dom'

function ProductsList ({ products }) {
  return (
    <ul className='category-products-list'>
      {
        products.map((product, index) => {
          return (
            <li key={index}>
              <Link to={`/products/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='category-product-card'>
                  <div className='category-product-image'>
                    <img
                      src={product.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                      alt={product.name}
                      height='170'
                      width='150'
                    />
                  </div>
                  <p>{product.name}</p>
                  <p>Rs. {product.price}</p>
                </div>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

export default ProductsList
