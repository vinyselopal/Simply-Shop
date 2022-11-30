import ProductsList from '../components/ProductsList.js'

function ProductsPage ({ products }) {
  <div className='home-products-container'>
    <div className='home-product-list'>
      <h2>Electronics</h2>
      <ProductsList products={products.filter(product => product.category === 'electronics')} />
    </div>
    <div className='home-product-list'>
      <h2>Home Appliances</h2>
      <ProductsList products={products.filter(product => product.category === 'home-appliances')} />
    </div>
    <div className='home-product-list'>
      <h2>Clothes</h2>
      <ProductsList products={products.filter(product => product.category === 'clothes')} />
    </div>
  </div>
}

export default ProductsPage
