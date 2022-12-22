import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setOrder } from '../redux/cartSlice'
function Options () {
  const [orderState, setOrderState] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order = useSelector(state => state.order)
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    setOrderState(order)
  }, [])

  useEffect(() => {
    console.log('in useeffect')
    dispatch(setOrder({ ...order, paymentAmount: 500, deadline: toLocaleString(new Date()), products: cart }))
  }, [orderState])

  function handlePayment () {
    navigate('/payment')
  }
  return (
    <div className='flex justify-center'>
      <button onClick={handlePayment} className='bg-amber-500 p-2 m-4'>Continue to payment</button>
    </div>
  )
}

export default Options
