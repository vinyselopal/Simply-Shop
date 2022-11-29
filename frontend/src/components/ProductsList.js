import clientProducts from '../inventory.js'
import '../styles/product.css'
import { Link } from 'react-router-dom'
function ProductsList ({ products }) {
  console.log(products)
  return (
    <ul className='product-list'>
      {
                products.map((product, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/products/product/${product.id}`}>
                        <div className='product-card'>
                          <div className='product-image'>
                            <img src={product.image_url} alt='product image' height='120' width='120' />
                          </div>
                          <p>{product.name}</p>
                          <p>Rs. {product.price}</p>

                        </div>
                      </Link>
                    </li>
                  )
                }
                )

            }
    </ul>

  )
}

export default ProductsList
