import ProductsList from '../components/ProductsList.js'
import { Link } from 'react-router-dom'
function HomeProducts ({ products }) {
  return (
    <div className='home-products-container'>
      <div className='home-product-list'>
        <h2><Link to='/products/electronics'>Electronics</Link></h2>
        <ProductsList products={products.filter(product => product.category === 'electronics')} />
      </div>
      <div className='home-product-list'>
        <h2>Home Appliances</h2>
        <ProductsList products={products.filter(product => product.category === 'home-appliances')} />
      </div>
      <div className='home-product-list'>
        <h2>Clothes</h2>
        <ProductsList products={products.filter(product => product.category === 'clothes')} />
      </div>
    </div>
  )
}

export default HomeProducts
