import { Link } from 'react-router-dom'
import '../styles/product.css'

function ProductsList ({ products }) {
  console.log('products', products)
  return (
    <ul className='product-list'>
      {
        products.map((product, index) => {
          return (
            <li key={index}>
              <Link to={`/products/product/${product.id}`}>
                <div className='product-card'>
                  <div className='product-image'>
                    <img
                      src={product.image_url}
                      alt={product.name}
                      height='120'
                      width='120'
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
