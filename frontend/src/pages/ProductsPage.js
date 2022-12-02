import ProductsList from '../components/ProductsList.js'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
function ProductsPage ({ products }) {
  const { category } = useParams()
  const [localProducts, setLocalProducts] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  console.log(category)

  useEffect(() => {
    (async () => {
      await getProductsOfCategory()
      await getProductsCount()
    })()
  }, [])

  async function getProductsOfCategory (category) {
    await handlePagination(1, category)
  }

  async function getProductsCount () {
    const response = await fetch(`http://localhost:8000/products/pages/${category}`)
    const count = await response.json()
    const pageCount = Math.ceil(count / 10)
    console.log('pageCount after fetch call', pageCount, count)
    setPageCount(pageCount) // change accordingly
  }
  function priceLowToHigh (event) {
    setLocalProducts([...localProducts.sort((prev, curr) => prev.price - curr.price)])
    console.log('in low to high')
  }

  function priceHighToLow (event) {
    setLocalProducts([...localProducts.sort((prev, curr) => curr.price - prev.price)])
  }

  function handleSortOptions (event) {
    console.log('in handle sort options', event.target.value)
    switch (event.target.value) {
      case 'price low to high':
        console.log('in price low to high')
        priceLowToHigh()
        break

      case 'price high to low':
        priceHighToLow()
        break

      default:
        break
    }
  }

  async function handlePagination (page) {
    console.log('page', page, pageCount)
    const response = await fetch(`http://localhost:8000/products/page/?page=${page}&&category=${category}`)
    console.log('response', response)
    const products = await response.json()
    console.log(JSON.parse(products))
    setLocalProducts(JSON.parse(products))
    return JSON.parse(products)
  }

  if (!localProducts) {
    return (
      null
    )
  }

  function getPaginationButtons () {
    const buttonsArr = []
    for (let i = 1; i <= pageCount; i++) {
      buttonsArr.push(<button onClick={(event) => handlePagination(event.target.value)} value={i}>{i}</button>)
    }
    return buttonsArr
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
            pageCount ? getPaginationButtons() : null

          }

        </div>
      </div>
    </div>
  )
}

export default ProductsPage
