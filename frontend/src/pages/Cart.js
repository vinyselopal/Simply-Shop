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
  
  if (isEmpty) return <p>Your cart is empty</p>;
  console.log(items)
  return (
    <>
      <h1>Cart ({totalUniqueItems})</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
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
    </>
  );
}

export default Cart