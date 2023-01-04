import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Home from './Home'
import ProductDetails from './ProductDetails'
import Cart from './Cart'
import OrderPlaced from './OrderPlaced'
import Checkout from './Checkout'
import Header from './components/Header'
import SearchResults from './SearchResults'
import Signin from './Signin'
import Signup from './Signup'
import Payment from './Payment'
import Options from './Options'
import { useEffect, useState } from 'react'
import CategoryResults from './CategoryResults'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './styles/index.css'

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
function App () {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    (async () => {
      setProducts(JSON.parse(products))
      localStorage.setItem('products', products)
    })()
  }, [])

  return (
    <div className='App'>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path='' element={<HomeTemplate />}>
              <Route path='/' element={<Home products={products} />} />
              <Route path='/products/product/:id' element={<ProductDetails products={products} />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/search_results/:keyword' element={<SearchResults products={products} />} />
              <Route path='/products/:category' element={<CategoryResults products={products} />} />
            </Route>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/order_placed' element={<OrderPlaced />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/options' element={<Options />} />
          </Routes>
        </Provider>
      </Router>
    </div>
  )
}

export default App
