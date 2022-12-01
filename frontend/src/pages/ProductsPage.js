import ProductsList from '../components/ProductsList.js'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
function ProductsPage ({ products }) {
  const { category } = useParams()
  const [localProducts, setLocalProducts] = useState(null)
  console.log(category)

  useEffect(() => {
    (async () => {
      const pagedProducts = await handlePagination(1, category)
      setLocalProducts(pagedProducts)
    })()
  }, [])
  // useEffect(() => {
  //   const filteredProducts = products || JSON.parse(localStorage.getItem('products'))
  //   setLocalProducts(filteredProducts)
  // }, [products])

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
          <button onClick={(event) => handlePagination(event.target.value)} value={1}>1</button>
          <button onClick={(event) => handlePagination(event.target.value)} value={2}>2</button>
          <button onClick={(event) => handlePagination(event.target.value)} value={3}>3</button>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
