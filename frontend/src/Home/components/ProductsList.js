import { Link } from 'react-router-dom'
import home from '../home.module.css'

function ProductsList ({ products }) {
  if (!products) return null

  return (
    <ul className={home['product-list']}>
      {
        products.slice(0, 4).map((product, index) => {
          return (
            <li key={index}>
              <Link to={`/products/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className={home['home-product-card']}>
                  <div className={home['home-product-image']}>
                    <img
                      src={product.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                      alt={product.name}
                      height='170'
                      width='150'
                    />
                  </div>
                  <div>{product.name}</div>
                  <div>Rs. {product.price}</div>
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
