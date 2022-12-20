import { useEffect } from 'react'
import { createOrder } from '../apis'
import { useSelector } from 'react-redux'
function Checkout () {
  const cart = useSelector(state => state.cart)
  const token = useSelector(state => state.token)
  const productsIdArray = []

  cart.forEach(item => {
    productsIdArray.push(item.item.id)
  })
  useEffect(() => {
    createOrder(token, productsIdArray)
  }, [])

  return (
    <p>Checkout</p>
  )
}

export default Checkout
