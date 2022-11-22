import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js'
import ProductPage from './pages/ProductPage.js'
import Cart from './pages/Cart.js'
import OrderPlaced from './pages/OrderPlaced.js'
import Header from './components/Header.js'
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products/product/:id' element={<ProductPage/>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order_placed" element={<OrderPlaced />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
