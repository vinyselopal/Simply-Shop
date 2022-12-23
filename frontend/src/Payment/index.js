import { placeOrder } from '../apis'
import { useSelectorWrapper } from '../utils'

function Payment () {
  const token = useSelectorWrapper('token')
  const order = useSelectorWrapper('order')

  async function orderPlacementHandler () {
    const response = await placeOrder(token, order)
    console.log(response)
  }

  return (
    <div className='flex justify-center'>
      <button className='bg-amber-500 m-4 p-2' onClick={orderPlacementHandler}>Pay</button>
    </div>
  )
}

export default Payment
