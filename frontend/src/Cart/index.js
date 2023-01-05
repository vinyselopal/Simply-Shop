import CartItem from './components/CartItem'
import { useDispatch , dispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCartById, setCart } from '../redux/slice'
import { useNavigate } from 'react-router-dom'
import { useSelectorWrapper } from '../utils'
function Cart () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelectorWrapper('token')

  useEffect(() => {
    // dispatch(setCart([]))
    dispatch(fetchCartById(token))
  }, [])

  const cart = useSelectorWrapper('cart')

  const isEmpty = !cart || !cart.length

  if (isEmpty) {
    return (
      <div className='cart-container'>
        <div className='cart-empty-message'>
          <h2>Shopping Cart empty.</h2>
        </div>
      </div>
    )
  }
  const totalUniqueItems = cart.length

  const subTotal = cart.reduce((prev, curr) => {
    return (prev) + (curr.item.price * curr.quantity)
  }, 0)

  function checkoutHandler () {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
    if (!loggedIn) navigate('/signin?checkout=true')
    else navigate('/checkout')
  }

  return (
    <div className='cart-page'>
      <div className='cart-billing-container'>
        <div className='cart-page-items'>
          <h3>Shopping Cart ({totalUniqueItems})</h3>
          <ul className='cart-page-items-list'>
            {
              cart.map((cartItem) =>
                <CartItem
                  cartItem={cartItem}
                  key={cartItem.item.id}
                />
              )
            }
          </ul>
        </div>
        <div className='cart-page-billing'>
          <div className='cart-billing-subtotal'>
            Sub-total ({totalUniqueItems} items): Rs. {subTotal}
          </div>
          <button className='cart-billing-checkout-button' onClick={checkoutHandler}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
