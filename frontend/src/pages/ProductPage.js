import {useSearchParams, Link} from 'react-router-dom'
import Product from '../components/Product.js'
import product from '../inventory.js'
function ProductPage () {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    console.log(id)
    return (
        <div className="product-page">
            <Product product={product}></Product>
            <Link to="/cart"><button>Add to Cart</button></Link>
        </div>
        
    )
}

export default ProductPage