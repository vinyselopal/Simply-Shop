import HomeProducts from '../components/HomeProducts'
import '../styles/product.css'
function Home ({ products }) {
  console.log(products)
  return (
    <div className='home'>
      {
        products
          ? (
            <HomeProducts products={products} />
            )
          : null
      }

    </div>
  )
}

export default Home
