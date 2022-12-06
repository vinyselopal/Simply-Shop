import { useCart } from 'react-use-cart'
import './cart.css'
function CartItem ({ item }) {
  const {
    updateItemQuantity,
    removeItem
  } = useCart()

  return (
    <li key={item.id} className='cart-page-item product-card'>
      <div className='cart-page-product-image'>
        <img src={item.image_url} height='180' width='150' />
      </div>
      <div className='cart-page-product-details'>
        <h3>{item.name}</h3>
        <div>{item.description}</div>
        <div className='cart-page-product-update-buttons'>
          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className='cart-item-button'>
            -
          </button>
          <div className='cart-page-item-quantity'> {item.quantity} </div>
          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className='cart-item-button'>
            +
          </button>
        </div>
        <div>
          <button onClick={() => removeItem(item.id)}>delete</button>
        </div>
      </div>
      <div className='cart-page-product-price'>
        Rs. {item.price}
      </div>
    </li>
  )
}

export default CartItem
