import { useEffect, useState } from 'react'
import { createOrder, cancelOrder } from '../apis'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setOrder } from '../redux/cartSlice'

function Checkout () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const token = useSelector(state => state.token)
  const order = useSelector(state => state.order)

  const [orderID, setOrderID] = useState(null)

  const productsIdArray = []

  cart.forEach(item => {
    productsIdArray.push(item.item.id)
  })

  useEffect(() => {
    if (!order) {
      const order = {
        productsIdArray
      }
      dispatch(setOrder(order))
      let orderID
      (async () => {
        await createOrder(token, productsIdArray).then(orderID => {
          console.log('orderID', orderID)
          setOrderID(orderID)
        })
        dispatch(setOrder({ ...order, orderID }))
      })()
    }
  }, [])

  useEffect(() => {
    if (orderID) {
      const backListener = () => {
        console.log('back pressed')

        if (window.confirm('cancel this order?')) {
          const response = cancelOrder(token, orderID)
          console.log('response in component after deleting order', response)
        } else console.log('stay on the page')
        window.removeEventListener('popstate', backListener)
      }
      window.addEventListener('popstate', backListener)
    }
  }, [orderID])

  function paymentHandler () {
    navigate('/payment')
  }

  function cancellationHandler () {
    // remove order details from orders table and orders_mapping table
  }

  return (
    <div>
      <Link to='/' className='no-underline text-black pl-5 position-absolute'><h2>Amazon</h2></Link>

      <div className='flex bg-gray-300 justify-center p-2'>
        <h2 className='pl-5'>Checkout</h2>
      </div>
      <div className='flex justify-center m-4'>
        <button className='bg-amber-500 p-2 m-2' onClick={paymentHandler}>Make payment</button>
        <button className='bg-amber-500 p-2 m-2' onClick={cancellationHandler}>Cancel order</button>
      </div>
    </div>
  )
}

export default Checkout
