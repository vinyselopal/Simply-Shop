import ProductsList from './components/ProductsList.js'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { handlePagination, getProductsCount } from '../apis'
import categoryStyle from './category.module.css'

function ProductsPage () {
  const { category } = useParams()
  const [localProducts, setLocalProducts] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      await getProductsOfCategory(category)
      const pageCount = await getProductsCount(category)
      setPageCount(pageCount)
    })()
  }, [])

  async function getProductsOfCategory (category) {
    const products = await handlePagination(1, category, pageCount, 'price', 'ASC')
    setLocalProducts(products)
  }

  async function priceLowToHigh () {
    const products = await handlePagination(1, category, pageCount, 'price', 'ASC')
    setLocalProducts(products)
  }

  async function priceHighToLow () {
    const products = await handlePagination(1, category, pageCount, 'price', 'DESC')
    setLocalProducts(products)
  }

  async function paginationEventHandler (page, category, limit) {
    const products = await handlePagination(page, category, limit, 'price', 'ASC')
    setLocalProducts(products)
  }

  useEffect(() => {
    (async () => paginationEventHandler(page, category, 10))()
  }, [page])

  function getPaginationButtons (pageCount) {
    const buttonsArr = []

    for (let i = 1; i <= pageCount; i++) {
      buttonsArr.push(
        <button
          key={i}
          onClick={(event) => setPage(i)}
          value={i}
          className='bg-gray-300 p-2 m-2 border-2 border-solid border-black'
        >{i}
        </button>
      )
    }
    return buttonsArr
  }

  async function handleSortOptions (event) {
    switch (event.target.value) {
      case 'price low to high':
        await priceLowToHigh()
        break

      case 'price high to low':
        await priceHighToLow()
        break

      default:
        break
    }
  }

  if (!localProducts) {
    return (
      null
    )
  }

  return (
    <div className={categoryStyle['category-products-container']}>
      <div>
        <h2>
          <Link style={{ textDecoration: 'none', color: 'black' }}>
            {category}
          </Link>
        </h2>
      </div>
      <div>
        <select onChange={handleSortOptions}>
          <option>price high to low</option>
          <option>price low to high</option>
        </select>
      </div>
      <div>
        <ProductsList products={localProducts} />
      </div>
      <div className={categoryStyle['category-products-page-buttons']}>
        {
            pageCount ? getPaginationButtons(pageCount) : null

          }

      </div>
    </div>

  )
}

export default ProductsPage
