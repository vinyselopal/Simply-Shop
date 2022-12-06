import { useParams } from 'react-router-dom'
import ProductsList from './components/ProductsList.js'
import { useEffect, useState } from 'react'
import { getMatchingProducts } from '../apis'
import './searchResults.css'
function SearchResults () {
  const { keyword } = useParams()
  const [localProducts, setLocalProducts] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getMatchingProducts(keyword)
      setLocalProducts(response)
    })()
  }, [])

  return (
    <div className='search-results'>
      <h2>Search Results</h2> {
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
}

export default SearchResults
