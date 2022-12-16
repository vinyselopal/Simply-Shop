import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import ProductPage from './ProductPage'
import Cart from './Cart'
import Checkout from './Checkout'
import Header from './components/Header'
import SearchResults from './SearchResults'
import Signin from './Signin'
import Signup from './Signup'
import { useEffect, useState } from 'react'
import { getServerProducts } from './apis'
import ProductsPage from './ProductsPage'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './styles/index.css'

function App () {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    (async () => {
      const products = await getServerProducts()
      setProducts(JSON.parse(products))
      localStorage.setItem('products', products)
    })()
  }, [])

  return (
    <div className='App'>
      <Router>
        <Provider store={store}>
          <Header products={products} />
          <Routes>
            <Route path='/' element={<Home products={products} />} />
            <Route path='/products/product/:id' element={<ProductPage products={products} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order_placed' element={<Checkout />} />
            <Route path='/search_results/:keyword' element={<SearchResults products={products} />} />
            <Route path='/products/:category' element={<ProductsPage products={products} />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Provider>

      </Router>
    </div>
  )
}

export default App
