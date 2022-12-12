import HomeProducts from './components/HomeProducts'
import home from './home.module.css'
function Home () {
  return (
    <div className={home.home}>
      <HomeProducts />

    </div>
  )
}

export default Home
