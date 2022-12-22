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

  const [orderID, setOrderID] = useState(JSON.parse(localStorage.getItem('order'))?.orderID)

  useEffect(() => {
    if (!order) {
      const productsIdArray = []

      cart.forEach(item => {
        productsIdArray.push(item.item.id)
      })
      const order = {
        productsIdArray
      }
      dispatch(setOrder(order))
      createOrder(token, productsIdArray).then(orderID => {
        setOrderID(orderID)
        dispatch(setOrder({ ...order, orderID }))
      })
    }

    if (order) {
      const productsIdArray = []

      cart.forEach(item => {
        productsIdArray.push(item.item.id)
      })
      const order = {
        productsIdArray
      }
      dispatch(setOrder(order))
      cancellationHandler().then(() => {
        createOrder(token, productsIdArray).then(orderID => {
          setOrderID(orderID)
          dispatch(setOrder({ ...order, orderID }))
        })
      })
    }
  }, [])

  function renderOptions () {
    navigate('/options')
  }
  const cancellationHandler = async () => {
    await cancelOrder(token, orderID)
    dispatch(setOrder(null))
    localStorage.removeItem('order')
  }

  const cancellationListener = async () => {
    await cancellationHandler()
    navigate('/cart')
  }
  return (
    <div>
      <Link to='/' className='no-underline text-black pl-5 position-absolute'><h2>Amazon</h2></Link>

      <div className='flex bg-gray-300 justify-center p-2'>
        <h2 className='pl-5'>Checkout</h2>
      </div>
      <div className='flex justify-center m-4'>
        <button className='bg-amber-500 p-2 m-2' onClick={renderOptions}>Continue</button>
        <button className='bg-amber-500 p-2 m-2' onClick={cancellationListener}>Cancel order</button>
      </div>
    </div>
  )
}

export default Checkout
