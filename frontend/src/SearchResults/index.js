import { useParams } from 'react-router-dom'
import ProductsList from './components/ProductsList.js'
import { useEffect, useState } from 'react'

function SearchResults () {
  const { keyword } = useParams()
  const [localProducts, setLocalProducts] = useState(null)

  useEffect(() => {
    (async () => await getMatchingProducts(keyword))()
  }, [])

  async function getMatchingProducts (keyword) {
    const response = await fetch(`http://localhost:8000/products/matchingProducts/${keyword}`)
    const matchingProducts = await response.json()
    console.log('matchingProducts', matchingProducts)
    setLocalProducts(matchingProducts)
  }

  return (
    <div className='search-results'>
      {
        localProducts
          ? (
            <div className='search-product-list'>
              <h2>Search Results</h2>
              {
                localProducts.length
                  ? (
                    <ProductsList products={localProducts} />
                    )
                  : (
                    <div>
                      <p>Sorry, no matches found</p>
                    </div>
                    )
              }
            </div>
            )
          : null
      }
    </div>
  )
}

export default SearchResults
