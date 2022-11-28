import { Link } from 'react-router-dom'
import '../styles/product.css'
import ProductsList from '../components/ProductsList.js'
import { useState, useEffect } from 'react'
function Home ({ products }) {
  return (
    <div className='home'>
      {
        products
          ? (
            <>
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
            </>
            )
          : null
      }

    </div>
  )
}

export default Home
