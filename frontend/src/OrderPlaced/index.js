import { useEffect, useState } from 'react'
import { useSelectorWrapper } from '../utils'
import { placeOrder } from '../apis'

function OrderPlaced () {
  const order = useSelectorWrapper('order')
  const [orderPlaced, setOrderPlaced] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await placeOrder(order)
      const orderID = await response.json()
      if (orderID) setOrderPlaced(true)
      console.log(response, 'response on order place')
    })()
  })

  return (
    orderPlaced === true
      ? (
        <div className='order-placed'>
          <p>Order Placed</p>
        </div>
        )
      : null
  )
}

export default OrderPlaced
