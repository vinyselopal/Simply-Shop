import ProductsList from '../components/ProductsList.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductsOfCategory } from '../apis'
function HomeProducts () {
  const [localProducts, setLocalProducts] = useState([])

  useEffect(() => {
    (async () => {
      const electronicsProducts = await getProductsOfCategory('electronics')
      await setLocalProducts((localProducts) =>
        [...localProducts,
          {
            category: 'electronics',
            products: JSON.parse(electronicsProducts)
          }])

      const clothesProducts = await getProductsOfCategory('clothes')
      await setLocalProducts((localProducts) =>
        [...localProducts,
          {
            category: 'clothes',
            products: JSON.parse(clothesProducts)
          }])

      const homeAppliancesProducts = await getProductsOfCategory('home-appliances')
      await setLocalProducts((localProducts) =>
        [...localProducts,
          {
            category: 'home-appliances',
            products: JSON.parse(homeAppliancesProducts)
          }])
    })()
  }, [])

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
