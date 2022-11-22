import product from '../inventory.js'
import Product from '../components/Product.js'
import {Link} from 'react-router-dom'
function Cart () {
    return (
        <div className="cart">
            <Product product={product}></Product>
            <Link to="/order_placed"><button>Buy</button></Link>
        </div>
    ) 
}

export default Cart