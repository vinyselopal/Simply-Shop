import ProductsList from './ProductsList.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductsOfCategory } from '../../apis'
function HomeProducts () {
  const [localProducts, setLocalProducts] = useState([])
  const categories = ['electronics', 'home-appliances', 'clothes']

  useEffect(() => {
    (async () => {
      console.log('start')
      let localProducts = {}
      for (let i = 0; i < categories.length; i++) {
        console.log('before', localProducts)
        console.log(categories)
        const response = await getProductsOfCategory(categories[i])

        const products = JSON.parse(response)

        console.log('products', products)

        const tempObj = {}
        tempObj[categories[i]] = products

        localProducts = {
          ...localProducts,
          ...tempObj
        }
      }
      console.log('after', localProducts)

      setLocalProducts(localProducts)
    })()
  }, [])

  return (
    <div className='home-products-container'>
      <div className='home-product-list'>
        <h2><Link to='/products/electronics'>Electronics</Link></h2>
        {
          localProducts.electronics
            ? (
              <ProductsList products={localProducts.electronics} />
              )
            : null
        }
      </div>
      <div className='home-product-list'>
        <h2><Link to='/products/home-appliances'>Home Appliances</Link></h2>
        {
          localProducts['home-appliances']
            ? (
              <ProductsList products={localProducts['home-appliances']} />
              )
            : null
        }
      </div>
      <div className='home-product-list'>
        <h2><Link to='products/clothes'>Clothes</Link></h2>
        {
          localProducts.clothes
            ? (
              <ProductsList products={localProducts.clothes} />
              )
            : null
        }
      </div>
    </div>
  )
}

export default HomeProducts
