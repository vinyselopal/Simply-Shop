import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import ProductPage from './ProductPage'
import Cart from './Cart'
import Checkout from './Checkout'
import Header from './components/Header'
import SearchResults from './SearchResults'
import { CartProvider } from 'react-use-cart'
import { useEffect, useState } from 'react'
import { getServerCart, getServerProducts, updateServerCart } from './apis'
import ProductsPage from './ProductsPage'

function App () {
  const [cart, setCart] = useState(null)
  const [products, setProducts] = useState(null)

  useEffect(() => {
    (async () => {
      const products = await getServerProducts()
      setProducts(JSON.parse(products))
      localStorage.setItem('products', products)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const initialCart = await getServerCart()
      setCart(initialCart)
    })()
  }, [])

  const storageProvider = (key, initialValue) => {
    const localCart = localStorage.getItem(key)

    return [localCart || cart || initialValue, async (cartStr) => {
      // custom storage
      localStorage.setItem(key, cartStr)
      updateServerCart(cartStr)
    }]
  }

  return (
    <div className='App'>
      <Router>
        <CartProvider storage={storageProvider}>
          <Header products={products} />
          <Routes>
            <Route path='/' element={<Home products={products} />} />
            <Route path='/products/product/:id' element={<ProductPage products={products} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order_placed' element={<Checkout />} />
            <Route path='/search_results/:keyword' element={<SearchResults products={products} />} />
            <Route path='/products/:category' element={<ProductsPage products={products} />} />
          </Routes>
        </CartProvider>

      </Router>
    </div>
  )
}

export default App
