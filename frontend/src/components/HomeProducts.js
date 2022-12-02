import ProductsList from '../components/ProductsList.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function HomeProducts () {
  const [localProducts, setLocalProducts] = useState([])
  console.log('rerendering')

  useEffect(() => {
    (async () => {
      await getProductsOfCategory('electronics')
      await getProductsOfCategory('clothes')
      await getProductsOfCategory('home-appliances')
    })()
  }, [])

  async function getProductsOfCategory (category) {
    const response = await fetch(`http://localhost:8000/products/page/?page=1&&category=${category}`)
    console.log('response', response)
    const products = await response.json()
    await setLocalProducts((localProducts) => [...localProducts, { category, products: JSON.parse(products) }])
    return localProducts
  }

  function getFilteredProducts (category) {
    const filteredObjects = localProducts.find(product => product.category === category)
    const filteredProducts = filteredObjects ? filteredObjects.products : null
    return filteredProducts
  }

  return (
    <div className='home-products-container'>
      <div className='home-product-list'>
        <h2><Link to='/products/electronics'>Electronics</Link></h2>
        {
          getFilteredProducts('electronics')
            ? (
              <ProductsList products={getFilteredProducts('electronics')} />
              )
            : null
        }
      </div>
      <div className='home-product-list'>
        <h2><Link to='/products/home-appliances'>Home Appliances</Link></h2>
        {
          getFilteredProducts('home-appliances')
            ? (
              <ProductsList products={getFilteredProducts('home-appliances')} />
              )
            : null
        }
      </div>
      <div className='home-product-list'>
        <h2><Link to='products/clothes'>Clothes</Link></h2>
        {
          getFilteredProducts('clothes')
            ? (
              <ProductsList products={getFilteredProducts('clothes')} />
              )
            : null
        }
      </div>
    </div>
  )
}

export default HomeProducts
