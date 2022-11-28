import { Link } from 'react-router-dom'
import '../styles/product.css'
import ProductsList from '../components/ProductsList.js'
function Home () {
  return (
    <div className='home'>
      <div className='home-product-list'>
        <h2>List 1</h2>
        <ProductsList />
      </div>
      <div className='home-product-list'>
        <h2>List 2</h2>
        <ProductsList />
      </div>
    </div>
  )
}

export default Home
