import { Link } from 'react-router-dom'

import ProductsList from '../components/ProductsList.js';
function Home() {
  return (
    <div className="home">
      <ProductsList></ProductsList>
      <Link to="/cart"><button>Cart</button></Link>
    </div>
  );
}

export default Home;
