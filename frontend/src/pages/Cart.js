import products from '../inventory.js'
import '../styles/cart.css'
import { CartProvider, useCart } from 'react-use-cart'

function Cart () {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    setItems,
    emptyCart
  } = useCart()

  return (
    <div className='cart-page'>
      <div className='cart-page-items'>
        {
        (isEmpty)
          ? <div className='cart-empty-message'><h2>Shopping Cart empty.</h2><div className='cart-empty-icon'><span className='material-icons'>sentiment_dissatisfied </span><p>feels so light</p></div> </div>
          : <h3>Shopping Cart ({totalUniqueItems})</h3>
      }

        <ul className='cart-page-items-list'>
          {items.map((item) => (
            <li key={item.id} className='cart-page-item product-card'>
              <div className='cart-page-product-image'>
                <img src={item.image} height='120' width='120' />
              </div>
              <div className='cart-page-product-details'>
                <div>{item.description}</div>
                <div className='cart-page-product-update-buttons'>
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <p className='cart-page-item-quantity'>{item.quantity}</p>
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div><button onClick={() => removeItem(item.id)}>delete</button></div>
              </div>
              <div className='cart-page-product-price'>
                Rs. {item.price}
              </div>

            </li>
          ))}
        </ul>
      </div>
      <div className='cart-page-billing'>
        <h3>Sub-total: {items.length
          ? items.slice(1).reduce((prev, curr) => {
            return (prev) + (curr.price * curr.quantity)
          }, items[0].price * items[0].quantity)
          : 0} Rs
        </h3>
      </div>

    </div>
  )
}

export default Cart
