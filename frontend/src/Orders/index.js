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
    <div className='m-auto flex justify-center'>
      <div className=' mt-16 mr-4 ml-4 p-4 flex flex-col w-3/5 items-stretch'>
        <div className='flex flex-col'>
          <h3 className='border-b-2'>My Orders</h3>
        </div>
        <div>Total number of orders</div>
        <ul>
          {
          orders?.map((order, index) => (
            <li key={index}>
              <div className='m-4 p-2 rounded  border-2 border-slate-200'>
                order ID : {order.id}
              </div>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

export default Orders
