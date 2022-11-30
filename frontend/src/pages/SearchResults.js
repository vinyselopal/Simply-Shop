import { useParams } from 'react-router-dom'
import '../styles/product.css'
import ProductsList from '../components/ProductsList.js'

function SearchResults ({ products }) {
  const { keyword } = useParams()
  console.log('keyword', keyword)
  const filteredProducts = products
    ? products.filter(product => {
      return product.name.toLowerCase() === keyword.toLowerCase()
    })
    : null
  return (
    <div className='search-results'>
      {/* styling needs to be like a products page. Need uniformity  */}
      {
        filteredProducts
          ? (
            <div className='search-product-list'>
              <h2>Search Results</h2>
              {
                filteredProducts.length
                  ? (
                    <ProductsList products={filteredProducts} />
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
