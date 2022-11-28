import products from '../inventory.js'
import Product from './Product.js'
import '../styles/product.css'
import { Link } from 'react-router-dom'

function ProductsList () {
  return (
    <ul className='product-list'>
      {
                products.map((product, index) => (
                  <li key={index}>
                    <Link to={`/products/product/${product.id}`}>
                      <div className='product-card'>
                        <div className='product-image'>
                          <img src={product.image} alt='a brown tshirt' height='120' width='120' />
                        </div>
                        <p>{product.name}</p>
                        <p>Rs. {product.price}</p>

                      </div>
                    </Link>
                  </li>
                )
                )

            }
    </ul>

  )
}

export default ProductsList
