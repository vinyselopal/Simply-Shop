import products from '../inventory.js'
import Product from './Product.js'
import '../styles/product.css'
import { Link } from 'react-router-dom'

function ProductsList () {
    return (
        <ul className="product-list">
            {
                products.map((product, index) => (
                    <li>
                    <Link to={`/products/product/${product.id}`}>
                  <div className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt="a brown tshirt" height='100' width='100' />
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