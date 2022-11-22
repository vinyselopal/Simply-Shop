import product from '../inventory.js'
import Product from './Product.js'

function ProductsList () {
    return (
        <Product product={product}></Product>
    )
}

export default ProductsList