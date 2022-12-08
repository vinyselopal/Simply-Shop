import CartItem from './components/CartItem'
import { useSelector } from 'react-redux'
function Cart () {
  console.log('state', useSelector((state) => state))
  const cart = useSelector((state) => state.cart)
  const isEmpty = cart.length === 0
  const totalUniqueItems = cart.length
  console.log('check check', isEmpty, totalUniqueItems)
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
          <div className='cart-billing-subtotal'>Sub-total ({totalUniqueItems} items): Rs. {

         cart.reduce((prev, curr) => {
           console.log('cart', cart)
           return (prev) + (curr.item.price * curr.quantity)
         }, 0)

         }
          </div>
          <button className='cart-billing-checkout-button'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
