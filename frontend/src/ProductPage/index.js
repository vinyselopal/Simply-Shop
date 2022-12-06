import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { useState, useEffect } from 'react'
import './product.css'
function ProductPage ({ products }) {
  const navigate = useNavigate()
  const { addItem, items } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)
  const { id } = useParams()
  const product = products
    ? products.find(
      product => `${product.id}` === id
    )
    : JSON.parse(localStorage.getItem('products')).find(
      product => `${product.id}` === id
    )

  useEffect(() => {
    console.log(addedToCart)
  }, [addedToCart])

  function addToCart () {
    addItem(product, 1)
  }

  useEffect(() => {
    console.log('items', items, 'product', product)
    if (items.find(a => a.id === product.id)) {
      console.log('here')
      setAddedToCart(true)
    }
  }, items)

  function goToCart () {
    navigate('/cart')
  }
  return (
    <div className='product-page'>
      <div className='product-card'>
        <div className='product-image'>
          <img
            src={product.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
            alt='product image'
            height='300'
            width='250'
          />
        </div>
        <div className='product-details'>
          <h2>{product.name}</h2>
          <p>Rs. {product.price}</p>{
            !addedToCart
              ? (
                <button className='product-cart-button' onClick={addToCart}>Add to Cart</button>
                )
              : (
                <button className='product-gotocart-button' onClick={goToCart}>Go to Cart</button>
                )
          }

        </div>

      </div>
    </div>
  )
}

export default ProductPage
