import { useCart } from 'react-use-cart'

function CartItem ({ item }) {
  const {
    updateItemQuantity,
    removeItem
  } = useCart()

  return (
    <li key={item.id} className='cart-page-item product-card'>
      <div className='cart-page-product-image'>
        <img src={item.image_url} height='120' width='120' />
      </div>
      <div className='cart-page-product-details'>
        <div>{item.description}</div>
        <div className='cart-page-product-update-buttons'>
          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className='cart-item-button'>
            -
          </button>
          <p className='cart-page-item-quantity'>{item.quantity}</p>
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
