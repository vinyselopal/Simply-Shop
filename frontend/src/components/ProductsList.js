import products from '../inventory.js'
import Product from './Product.js'

function ProductsList () {
    return (
        <Product products={products}></Product>
    )
}

export default ProductsList