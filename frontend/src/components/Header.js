import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { useState } from 'react'

function SearchBar ({ suggestions, products, setSuggestions }) {
  const navigate = useNavigate()

  function onSearch (event) {
    const element = document.getElementsByClassName('header-search')[0]
    const keyword = element.value

    if (event.type === 'keydown' && event.key !== 'Enter') return

    if (!keyword) return

    navigate(`/search_results/${keyword}`)
    setSuggestions(null)
  }

  function searchSuggestions (event) {
    const keyword = event.target.value
    if (!keyword) return

    const suggestionsArray = products.filter(product => {
      return product.name.toLowerCase() === keyword.toLowerCase()
    })

    suggestionsArray.length ? setSuggestions(suggestionsArray) : setSuggestions(null)
  }
  return (
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
  )
}

function Header ({ products }) {
  const [suggestions, setSuggestions] = useState(null)
  const { totalUniqueItems } = useCart()

  return (
    products
      ? (
        <div className='header'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div className='app-logo'>
              <p>Amazon</p>
            </div>
          </Link>
          <SearchBar suggestions={suggestions} setSuggestions={setSuggestions} products={products} />
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
