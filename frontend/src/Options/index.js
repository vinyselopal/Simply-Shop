import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setOrder } from '../redux/slice'
import { useSelectorWrapper } from '../utils'

function Options () {
  const [orderState, setOrderState] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const order = useSelectorWrapper('order')
  const cart = useSelectorWrapper('cart')

  useEffect(() => {
    setOrderState(order)
  }, [])

  useEffect(() => {
    const date = (new Date()).toISOString().substring(0, 10)
    dispatch(setOrder({ ...order, paymentAmount: 500, deadline: date, products: cart }))
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
