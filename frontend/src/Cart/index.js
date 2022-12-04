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
          <div className='cart-empty-icon'>
            <span className='material-icons'>sentiment_dissatisfied </span>
            <p>feels so light</p>
          </div>
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
          <h3>Sub-total: {
         items.reduce((prev, curr) => (prev) + (curr.price * curr.quantity), 0)
         } Rs
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Cart
