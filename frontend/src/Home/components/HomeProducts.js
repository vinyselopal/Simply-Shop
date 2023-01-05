import ProductsList from './ProductsList.js'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import home from '../home.module.css'
import { getProductsOfCategoryThunk } from '../../redux/slice'
import { useDispatch, useSelector } from 'react-redux'

function HomeProducts () {
  const dispatch = useDispatch()
  const categories = ['electronics', 'home-appliances', 'clothes']

  const products = useSelector(state => state.products)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    dispatch(getProductsOfCategoryThunk(categories))
  }

  return (
    <div className={home['home-products-container']}>
      <div className={home['home-product-list']}>
        {
          categories.map(
            (category, index) => (
              <div className={home['home-product-list']} key={index}>
                <h2>
                  <Link
                    to={`/products/${category}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {category}
                  </Link>
                </h2>
                {
                  products
                    ? (
                      <ProductsList products={products[category]} />
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
