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
        {
          cart
            ? <CartProvider storage={storageProvider}>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/product/:id' element={<ProductPage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/order_placed' element={<OrderPlaced />} />
              </Routes>
              </CartProvider>
            : null
        }

      </Router>
    </div>
  )
}

export default App
