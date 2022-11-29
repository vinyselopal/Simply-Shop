import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { useState } from 'react'
function Header ({ products }) {
  const [suggestions, setSuggestions] = useState(null)
  const { totalUniqueItems } = useCart()
  const navigate = useNavigate()
  function onSearch (event) {
    const keyword = document.getElementsByClassName('header-search')[0].value
    if (event.type === 'keydown' && event.key !== 'Enter') return
    if (!keyword) return
    navigate(`/search_results/${keyword}`)
  }

  function searchSuggestions (event) {
    const keyword = event.target.value
    if (!keyword) return
    const suggestionsArray = products.filter(product => {
      console.log('debug', product.name.toLowerCase(), keyword.toLowerCase())
      return product.name.toLowerCase() === keyword.toLowerCase()
    })
    suggestionsArray.length ? setSuggestions(suggestionsArray) : setSuggestions(null)
  }
  return (
    products
      ? (
        <div className='header'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div className='app-logo'>
              <p>Amazon</p>
            </div>
          </Link>
          <div className='header-search-container'>
            <div className='header-searchbar-button-container'>
              <input type='text' className='header-search' onKeyDown={onSearch} onChange={searchSuggestions} />
              <button onClick={onSearch} className='header-search-button'>
                <span className='material-icons'>search</span>
              </button>
            </div>
            {
              suggestions
                ? (
                  <div className='header-search-suggestions-container'>
                    <ul className='header-search-suggestions-list'>{
                    suggestions.map((product, index) => {
                      return (
                        <li key={index}>
                          <Link to={`/products/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </li>
                      )
                    })
                  }
                    </ul>
                  </div>
                  )
                : null
              }
          </div>

          <Link to='/cart' className='cart-container'>
            <span className='material-icons cart-logo'>shopping_cart <span className='cart-count'>{totalUniqueItems}</span>
            </span>
          </Link>
        </div>
        )
      : null

  )
}

export default Header
