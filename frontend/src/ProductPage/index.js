import { useParams, useNavigate } from 'react-router-dom'
import { addItem } from '../redux/cartSlice'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './product.css'

function ProductPage ({ products }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart) // ?
  console.log('items', items)
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
    // const stateAfterAdding = useSelector((state) => state.cart)
    // console.log('stateAfterAdding', stateAfterAdding)
  }, [addedToCart])

  function addToCart () {
    dispatch(addItem(product, 1))
  }

  useEffect(() => {
    console.log('items', items, 'product', product)
    if (items.find(a => a.item.id === product.id)) {
      console.log('here')
      setAddedToCart(true)
    }
  }, [items, product])

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
