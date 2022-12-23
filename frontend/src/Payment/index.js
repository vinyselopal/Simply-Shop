import { useDispatch } from 'react-redux'
import { placeOrder } from '../apis'
import { useSelectorWrapper } from '../utils'

function Payment () {
  const dispatch = useDispatch()
  const token = useSelectorWrapper('token')
  const order = useSelectorWrapper('order')
  console.log(token, order)

  async function orderPlacementHandler () {
    const response = await placeOrder(token, order)
    console.log('order placement response', response)
    // update payment_status and deadline (+ 5 days) to order in DB :-
    // update count on products using product_id
    // update orders table by adding fields payment_status, deadline
    // arguments to api : token, order object (edit order object with options like payment_amount, deadline)
  }
  return (
    <div className='flex justify-center'>
      <button className='bg-amber-500 m-4 p-2' onClick={orderPlacementHandler}>Pay</button>
    </div>
  )
}

export default Payment
