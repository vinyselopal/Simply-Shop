import CartItem from './components/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchCartById } from '../redux/cartSlice'
function Cart () {
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])

  // dispatch(fetchCartById(1)).then((response) => {
  //   console.log('getting the cart from thunk', response)
  //   console.log('cart', JSON.parse(response.payload).items)
  //   setCart(JSON.parse(response.payload).items)
  // })
  // const localCart = useSelector((state) => state.cart)

  console.log('cart2', cart)
  const isEmpty = cart.length === 0
  const totalUniqueItems = cart.length

  const subTotal = cart.reduce((prev, curr) => {
    console.log('cart', cart)
    return (prev) + (curr.item.price * curr.quantity)
  }, 0)
  if (isEmpty) {
    return (
      <div className='cart-container'>
        <div className='cart-empty-message'>
          <h2>Shopping Cart empty.</h2>
        </div>
      </div>
    )
  }

  return (
    <div className='cart-page'>
      <div className='cart-billing-container'>
        <div className='cart-page-items'>
          <h3>Shopping Cart ({totalUniqueItems})</h3>
          <ul className='cart-page-items-list'>
            {cart.map((cartItem) => <CartItem cartItem={cartItem} key={cartItem.item.id} />)}
          </ul>
        </div>
        <div className='cart-page-billing'>
          <div className='cart-billing-subtotal'>
            Sub-total ({totalUniqueItems} items): Rs. {subTotal}
          </div>
          <button className='cart-billing-checkout-button'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
