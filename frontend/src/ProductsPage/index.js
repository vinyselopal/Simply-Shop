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
  const [sort, setSort] = useState({
    sortby: 'id',
    order: 'ASC'
  })

  useEffect(() => {
    (async () => {
      await getProductsOfCategory(category)
      const pageCount = await getProductsCount(category)
      setPageCount(pageCount)
    })()
  }, [])

  async function getProductsOfCategory (category) {
    const products = await handlePagination(1, category, pageCount, sort.sortby, sort.order)
    setLocalProducts(products)
  }

  useEffect(() => {
    (async () => {
      const products = await handlePagination(1, category, pageCount, sort.sortby, sort.order)
      setLocalProducts(products)
    })()
  }, [sort])

  async function paginationEventHandler (page, category, limit) {
    const products = await handlePagination(page, category, limit, sort.sortby, sort.order)
    setLocalProducts(products)
  }

  useEffect(() => {
    (async () => paginationEventHandler(page, category, 10))()
  }, [page])

  function getPaginationButtons (pageCount) {
    return (
      <>
        <button
          onClick={() => page - 1 > 0 && setPage(page - 1)}
        >
          Prev
        </button>
        <button
          value={page}
          className='bg-gray-300 p-2 m-2 border-2 border-solid border-black'
        >{page}
        </button>
        <button
          onClick={() => page + 1 < pageCount && setPage(page + 1)}
        >
          Next
        </button>
      </>
    )
  }

  async function handleSortOptions (event) {
    switch (event.target.value) {
      case 'featured':
        setSort({
          sortby: 'id',
          order: 'ASC'
        })
        break

      case 'price low to high':
        setSort({
          sortby: 'price',
          order: 'ASC'
        })
        break

      case 'price high to low':
        setSort({
          sortby: 'price',
          order: 'DESC'
        })
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
          <option selected>featured</option>
          <option>price high to low</option>
          <option>price low to high</option>

        </select>
      </div>
      <div>
        <ProductsList products={localProducts} />
      </div>
      <div className={categoryStyle['category-products-page-buttons']}>
        {
            pageCount
              ? getPaginationButtons(pageCount)
              : null

          }

      </div>
    </div>

  )
}

export default ProductsPage
