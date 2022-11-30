import ProductsPage from '../pages/ProductsPage'
import { Link } from 'react-router-dom'
import '../styles/product.css'
import { useState, useEffect } from 'react'
function Home ({ products }) {
  return (
    <div className='home'>
      {
        products
          ? (
            <ProductsPage products={products} />
            )
          : null
      }

    </div>
  )
}

export default Home
