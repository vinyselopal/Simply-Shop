import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getMatchingProducts } from '../apis'
import { useSelector } from 'react-redux'

import '../styles/header.css'

function SearchBar ({ suggestions, setSuggestions }) {
  const [mouseDown, setMouseDown] = useState(false)

  const navigate = useNavigate()
  function onSearch (event) {
    const element = document.getElementsByClassName('header-search')[0]
    const keyword = element.value

    if (event.type === 'keydown' && event.key !== 'Enter') return
    if (!keyword) return

    navigate(`/search_results/${keyword}`)
  }

  async function searchSuggestions (event) {
    const keyword = event.target.value
    if (!keyword) return
    const suggestionsArray = await getMatchingProducts(keyword)

    console.log(suggestionsArray)
    suggestionsArray.length ? setSuggestions(suggestionsArray) : setSuggestions(null)
  }

  function hideSuggestions (event) {
    if (!mouseDown) setSuggestions(null)
    setMouseDown(false)
  }

  return (
    <div className='header-search-container' onBlur={hideSuggestions}>
      <div className='header-searchbar-button-container'>
        <input
          type='text'
          className='header-search'
          onKeyDown={onSearch}
          onChange={searchSuggestions}
        />
        <div>
          <button onClick={onSearch} className='header-search-button'>
            <span className='material-icons'>search</span>
          </button>
        </div>

      </div>
      {
        suggestions
          ? (
            <div className='header-search-suggestions-container'>
              <ul className='header-search-suggestions-list'>{
              suggestions.map((product, index) => {
                return (
                  <li key={index} onMouseDown={() => setMouseDown(true)}>
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

  const cart = useSelector((state) => state.cart)

  const getTotalItems = () => {
    let total = 0
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }

  return (

    <div className='header'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='app-logo'>
          <p>Amazon</p>
        </div>
      </Link>
      <SearchBar suggestions={suggestions} setSuggestions={setSuggestions} products={products} />
      <Link to='/cart' className='cart-container'>
        <span className='material-icons cart-logo'>
          shopping_cart
          <span className='cart-count'>
            {getTotalItems()}
            {/* change to totalUniqueItems */}
          </span>
        </span>
      </Link>
    </div>
  )
}

export default Header
