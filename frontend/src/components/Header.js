import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getMatchingProducts, logoutFromServer } from '../apis'
import { useDispatch } from 'react-redux'
import { useSelectorWrapper } from '../utils'
import { useCookies } from 'react-cookie'

import header from '../styles/header.module.css'
import { setToken, setCart, setOrder } from '../redux/slice'

function SearchBar ({ suggestions, setSuggestions }) {
  const [mouseDown, setMouseDown] = useState(false)
  const [setCookie, removeCookie, cookies] = useCookies(['accessToken'])

  const navigate = useNavigate()

  function onSearch (event) {
    const element = document.getElementsByClassName(header['header-search'])[0]
    const keyword = element.value

    if (event.type === 'keydown' && event.key !== 'Enter') return
    if (!keyword) return

    navigate(`/search_results/${keyword}`)
  }

  async function searchSuggestions (event) {
    const keyword = event.target.value

    if (!keyword) {
      setSuggestions(null)
      return
    }
    const suggestionsArray = await getMatchingProducts(keyword)
    suggestionsArray.length
      ? setSuggestions(suggestionsArray)
      : setSuggestions(null)
  }

  function hideSuggestions (event) {
    if (!mouseDown) setSuggestions(null)
    setMouseDown(false)
  }

  function clickLink () {
    setSuggestions(null)
  }

  return (
    <div className={`${header['header-search-container']} flex`} onBlur={hideSuggestions}>
      <div className={`${header['header-searchbar-button-container']} flex w-100`}>
        <input
          type='text'
          className={`${header['header-search']} items-stretch text-black p-1 h-100%`}
          onKeyDown={onSearch}
          onChange={searchSuggestions}
          autoComplete='off'
        />
        <div>
          <button
            onClick={onSearch}
            className='p-1.5 text-black bg-amber-500 h-100%'
          >
            <span className='material-icons'>search</span>
          </button>
        </div>

      </div>
      {
        suggestions
          ? (
            <div className={header['header-search-suggestions-container']}>
              <ul className={header['header-search-suggestions-list']}>{
              suggestions.map((product, index) => {
                return (
                  <li key={index} onMouseDown={() => setMouseDown(true)}>
                    <Link to={`/products/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={clickLink}>
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
  const cart = useSelectorWrapper('cart')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function logoutHandler () {
    const response = await logoutFromServer()

    if (!response.ok) return

    dispatch(setCart([]))
    dispatch(setOrder(null))

    localStorage.setItem('loggedIn', false)
    localStorage.removeItem('cart')
    localStorage.removeItem('order')

    navigate('/signin')
  }

  const getTotalItems = () => {
    let total = 0

    cart?.forEach(item => {
      total += item.quantity
    })

    return total
  }

  const showOrders = () => {
    navigate('/orders')
  }
  return (

    <div className={`${header.header}`}>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className={header['app-logo']}>
          <p className='m-0'>Simply Shop</p>
        </div>
      </Link>
      <SearchBar
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        products={products}
      />
      <button onClick = {showOrders}>
        My Orders
      </button>
      {
            JSON.parse(localStorage.getItem('loggedIn'))
              ? (
                <button
                  onClick={logoutHandler}
                  className='py-1 px-2 bg-amber-500 text-black'
                >
                  Logout
                </button>
                )
              : (
                <Link
                  to='/signin'
                  className='py-1.5 px-2 bg-amber-500 text-black no-underline'
                >
                  signin
                </Link>
                )
          }

      <Link
        to='/cart'
        className={`${header['cart-container']} text-white`}
      >
        <span className='material-icons cart-logo'>
          shopping_cart
          <span className={header['cart-count']}>
            {getTotalItems()}
          </span>
        </span>
      </Link>
    </div>
  )
}

export default Header
