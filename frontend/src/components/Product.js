import {Link} from 'react-router-dom'
import '../styles/product.css'
function Product({products}) {
  return (
    <ul>
    {
      products.map((product, index) => 
              <li key={index} className="product">
                  <Link to={`/products/product/${product.id}`}>
                  <div className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt="a brown tshirt" height='100' width='100' />
                    </div>
                    <h2>{product.name}</h2>
                    <p>Rs. {product.price}</p>

                  </div>
                </Link>
              </li>
            )
      }
            </ul>
    
    
    
  );
}

export default Product;
