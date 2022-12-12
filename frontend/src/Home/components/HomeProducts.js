import ProductsList from './ProductsList.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductsOfCategory } from '../../apis'
import home from '../home.module.css'

function HomeProducts () {
  const [localProducts, setLocalProducts] = useState({})
  const categories = ['electronics', 'home-appliances', 'clothes']

  useEffect(() => {
    (async () => {
      for (let i = 0; i < categories.length; i++) {
        const response = await getProductsOfCategory(categories[i])
        const categoryProducts = JSON.parse(response)

        const tempObj = {}
        tempObj[categories[i]] = categoryProducts
        await setLocalProducts((localProducts) => {
          return {
            ...localProducts,
            ...tempObj
          }
        })
      }
    }
    )()
  }, [])

  return (
    <div className={home['home-products-container']}>
      <div className={home['home-product-list']}>
        {
          categories.map(
            (category, index) => (
              <div className={home['home-product-list']} key={index}>
                <h2><Link to={`/products/${category}`} style={{ textDecoration: 'none', color: 'black' }}>{category}</Link></h2>
                {
                  localProducts[category]
                    ? (
                      <ProductsList products={localProducts[category]} />
                      )
                    : null
                }
              </div>
            )
          )
        }

      </div>

    </div>
  )
}

export default HomeProducts
