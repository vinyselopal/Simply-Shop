import {Link} from 'react-router-dom'

function Product({product}) {
  return (

    <Link to={`/products/product/${product.id}`}>
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt="a brown tshirt"/>
        </div>
        <h2>{product.name}</h2>
        <p>Rs. {product.price}</p>

      </div>
    </Link>
    
  );
}

export default Product;
