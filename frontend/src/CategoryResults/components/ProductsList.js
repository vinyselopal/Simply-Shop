import { Link } from 'react-router-dom'
import categoryStyle from '../category.module.css'
import { emptyImageUrl } from '../../constants'

function ProductsList ({ products }) {
  return (
    <ul className={categoryStyle['category-products-list']}>
      {
        products.map((product, index) => {
          return (
            <li key={index}>
              <Link
                to={`/products/product/${product.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                <div className={categoryStyle['category-product-card']}>
                  <div className={categoryStyle['category-product-image']}>
                    <img
                      src={product.image_url || emptyImageUrl}
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
