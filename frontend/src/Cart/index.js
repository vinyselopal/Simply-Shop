import { useCart } from 'react-use-cart'
import CartItem from './components/CartItem'

function Cart () {
  const {
    isEmpty,
    totalUniqueItems,
    items
  } = useCart()

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
            {items.map((item) => <CartItem item={item} key={item.id} />)}
          </ul>
        </div>
        <div className='cart-page-billing'>
          <div className='cart-billing-subtotal'>Sub-total ({totalUniqueItems} items): Rs. {
         items.reduce((prev, curr) => (prev) + (curr.price * curr.quantity), 0)
         }
          </div>
          <button className='cart-billing-checkout-button'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
