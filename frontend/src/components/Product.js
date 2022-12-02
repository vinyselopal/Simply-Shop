import { Link } from 'react-router-dom'
import '../styles/product.css'

function Product ({ product, index, Carousel }) {
  return (

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
}

export default Product
