import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import ProductPage from './pages/ProductPage.js'
import Cart from './pages/Cart.js'
import OrderPlaced from './pages/OrderPlaced.js'
import Header from './components/Header.js'
import { CartProvider } from 'react-use-cart'
import { useEffect, useState } from 'react'

function App () {
  const [cart, setCart] = useState(null)
  const [products, setProducts] = useState(null)

  async function getServerProducts () {
    const response = await (await fetch('http://localhost:8000/products')).json()
    console.log('products from database api', typeof JSON.parse(response))
    setProducts(JSON.parse(response))
  }
  useEffect(() => {
    getServerProducts()
  }, [])

  const getServerCart = async () => {
    const initialCart = await (await fetch('http://localhost:8000/cart', { method: 'GET' })).json()
    console.log('initialCart', JSON.stringify(initialCart))
    setCart(JSON.stringify(initialCart))
  }

  useEffect(() => {
    getServerCart()
  }, [])
  const storageProvider = (key, initialValue) => {
    const localCart = localStorage.getItem(key)

    return [cart || initialValue, async (str) => {
      // custom storage
      localStorage.setItem(key, str)
      const response = await fetch('http://localhost:8000/cart', {
        method: 'PUT',
        body: JSON.stringify({
          cart: str,
          userID: 1
        }),
        headers: { 'content-type': 'application/json' }
      })
    }]
  }
  return (
    <div className='App'>
      <Router>
        <CartProvider storage={storageProvider}>
          <Header />
          <Routes>
            <Route path='/' element={<Home products={products} />} />
            <Route path='/products/product/:id' element={<ProductPage products={products} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order_placed' element={<OrderPlaced />} />
          </Routes>
        </CartProvider>

      </Router>
    </div>
  )
}

export default App
