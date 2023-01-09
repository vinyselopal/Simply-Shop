import { useDispatch } from 'react-redux'
import { incrementItemQuantityInCart, decrementItemQuantityInCart, removeItemFromCart } from '../../redux/slice'
import './cart.css'
import { emptyImageUrl } from '../../constants'

// use thunk to change server first
function CartItem ({ cartItem }) {
  const dispatch = useDispatch()
  return (
    <li
      key={cartItem.item.id}
      className='cart-page-item product-card'
    >
      <div className='cart-page-product-image'>
        <img
          src={cartItem.item.image_url || emptyImageUrl}
          height='180'
          width='150'
        />
      </div>
      <div className='cart-page-product-details'>
        <h3>{cartItem.item.name}</h3>
        <div>{cartItem.item.description}</div>
        <div className='cart-page-product-update-buttons'>
          <button
            onClick={() => dispatch(decrementItemQuantityInCart(cartItem.item.id))}
            className='cart-item-button'
          >
            -
          </button>
          <div className='cart-page-item-quantity'> {cartItem.quantity} </div>
          <button
            onClick={() => dispatch(incrementItemQuantityInCart(cartItem.item.id))}
            className='cart-item-button'
          >
            +
          </button>
        </div>
        <div>
          <button
            onClick={() => dispatch(removeItemFromCart(cartItem.item.id))}
            className='bg-gray-300 border-solid border-black p-1'
          >delete
          </button>
        </div>
      </div>
      <div className='cart-page-product-price'>
        Rs. {cartItem.item.price}
      </div>
    </li>
  )
}

export default CartItem
