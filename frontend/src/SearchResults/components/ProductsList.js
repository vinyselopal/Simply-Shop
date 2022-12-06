import { Link } from 'react-router-dom'

function ProductsList ({ products }) {
  return (
    <ul className='search-product-list'>
      {
        products.map((product, index) => {
          return (
            <li key={index}>
              <Link to={`/products/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='search-product-card'>
                  <div className='search-product-image'>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      height='170'
                      width='150'
                    />
                  </div>
                  <div>
                    {product.name}
                  </div>
                  <div>
                    Rs. {product.price}
                  </div>
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
