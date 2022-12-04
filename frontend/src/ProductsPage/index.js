import ProductsList from './components/ProductsList.js'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { handlePagination, getProductsCount } from '../apis'
function ProductsPage () {
  const { category } = useParams()
  const [localProducts, setLocalProducts] = useState(null)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    (async () => {
      await getProductsOfCategory2(category)
      const pageCount = await getProductsCount(category)
      setPageCount(pageCount)
    })()
  }, [])

  async function getProductsOfCategory2 (category) {
    const products = await handlePagination(1, category, pageCount)
    console.log('products', products)
    setLocalProducts(products)
  }

  function priceLowToHigh (event) {
    setLocalProducts([...localProducts.sort((prev, curr) => prev.price - curr.price)])
    console.log('in low to high')
  }

  function priceHighToLow (event) {
    setLocalProducts([...localProducts.sort((prev, curr) => curr.price - prev.price)])
  }

  async function paginationEventHandler (page, category, pageCount) {
    const products = await handlePagination(page, category, pageCount)
    setLocalProducts(products)
  }
  function getPaginationButtons (pageCount) {
    const buttonsArr = []
    for (let i = 1; i <= pageCount; i++) {
      buttonsArr.push(
        <button
          onClick={(event) => paginationEventHandler(event.target.value, category, pageCount)}
          value={i}
          key={i}
        >
          {i}
        </button>
      )
    }
    console.log('buttonsArr', buttonsArr, 'pageCount', pageCount)
    return buttonsArr
  }

  function handleSortOptions (event) {
    switch (event.target.value) {
      case 'price low to high':
        priceLowToHigh()
        break

      case 'price high to low':
        priceHighToLow()
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
    <div className='home-products-container'>
      <div className='home-product-list'>
        <h2><Link>{category}</Link></h2>
        <select onChange={handleSortOptions}>
          <option>price high to low</option>
          <option>price low to high</option>
        </select>
        <ProductsList products={localProducts} />
        <div className='home-products-page-buttons'>
          {
            pageCount ? getPaginationButtons(pageCount) : null

          }

        </div>
      </div>
    </div>
  )
}

export default ProductsPage
