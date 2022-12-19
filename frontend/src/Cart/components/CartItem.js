import { useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeItem } from '../../redux/cartSlice'
import './cart.css'

// use thunk to change server first
function CartItem ({ cartItem }) {
  const dispatch = useDispatch()
  return (
    <li key={cartItem.item.id} className='cart-page-item product-card'>
      <div className='cart-page-product-image'>
        <img src={cartItem.item.image_url} height='180' width='150' />
      </div>
      <div className='cart-page-product-details'>
        <h3>{cartItem.item.name}</h3>
        <div>{cartItem.item.description}</div>
        <div className='cart-page-product-update-buttons'>
          <button onClick={() => dispatch(decrementQuantity(cartItem.item.id))} className='cart-item-button'>
            -
          </button>
          <div className='cart-page-item-quantity'> {cartItem.quantity} </div>
          <button onClick={() => dispatch(incrementQuantity(cartItem.item.id))} className='cart-item-button'>
            +
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(removeItem(cartItem.item.id))}>delete</button>
        </div>
      </div>
      <div className='cart-page-product-price'>
        Rs. {cartItem.item.price}
      </div>
    </li>
  )
}

export default CartItem
