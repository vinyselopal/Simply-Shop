// import product from '../inventory.js'
// import Product from '../components/Product.js'
// import {Link} from 'react-router-dom'
// function Cart () {
//     return (
//         <div className="cart">
//             <Product product={product}></Product>
//             <Link to="/order_placed"><button>Buy</button></Link>
//         </div>
//     ) 
// }

// export default Cart
import products from '../inventory.js'
import '../styles/cart.css'
import { CartProvider, useCart } from "react-use-cart";


function Cart() {
  let {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    setItems,
    emptyCart
  } = useCart();
  
  console.log('items', items)
  return (
    <div className="cart-page">
      <div className="cart-page-items">
      {
        (isEmpty) ? <div className="cart-empty-message"><h2>Shopping Cart empty.</h2><div className='cart-empty-icon'><span className="material-icons">sentiment_dissatisfied </span><p>feels so light</p></div> </div>
          : <h2>Shopping Cart ({totalUniqueItems})</h2>
      }


<ul className='cart-page-items-list'>
  {items.map((item) => (
    <li key={item.id} className="cart-page-item product-card">
      <img src={item.image} height='100' width='100'/>
      <p>{item.quantity}</p>
      <button
        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
      >
        -
      </button>
      <button
        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
      >
        +
      </button>
      <button onClick={() => removeItem(item.id)}>&times;</button>
    </li>
  ))}
</ul>
      </div>
      <div className="cart-page-billing">
        <h2>Sub-total: {items.reduce(((prev,curr) => {
          console.log('prev', prev, 'curr', curr)
          return (prev) + (curr.price * curr.quantity)
        }), items[0].price * items[0].quantity) || 0}</h2>
      </div>
      
    </div>
  );
}

export default Cart