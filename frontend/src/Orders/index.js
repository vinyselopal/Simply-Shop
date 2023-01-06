import { useEffect, useState } from 'react'
import { getOrdersByID } from '../apis'
function Orders () {
  const [orders, setOrders] = useState(null)

  async function getOrders () {
    const { orders } = await getOrdersByID()
    setOrders(orders)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className=' mt-16 mr-4 ml-4 p-4'>
      <h3>Orders</h3>
      <ul>
        {
          orders?.map((order, index) => (
            <li key={index}>
              order ID : {order.id}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Orders
