import { useEffect, useState } from 'react'
import { getOrdersByID } from '../apis'
import { emptyImageUrl } from '../constants'
import { Link } from 'react-router-dom'

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
        {
        orders?.length
          ? (
            <div>
              <div>Total number of orders</div>
              <ul>
                {
                orders?.map((order, index) => (
                  <li key={index}>
                    <div className='m-4 rounded  border-2 border-slate-200'>
                      <div className='bg-slate-200 p-2 flex justify-between'>
                        <div>
                          order ID : {order.order_id}
                        </div>
                        <div>
                          delivery date : {order.expected_delivery}
                        </div>
                      </div>
                      <div className='pl-4 pr-4 pt-2 pb-2 flex items-center justify-between'>
                        <div>
                          <Link to={`/products/product/${order.product_id}`}>
                            <img
                              src={emptyImageUrl}
                              height='180'
                              width='150'
                            />
                          </Link>
                        </div>
                        <div className='flex flex-col'>
                          <div>
                            <strong>{order.name}</strong>
                          </div>
                          <div>
                            {order.description}
                          </div>
                        </div>
                        <div>
                          <strong>Total: {order.payment_amount}</strong>
                        </div>

                      </div>
                    </div>
                  </li>
                ))
                }
              </ul>
            </div>
            )
          : (
            <div>
              {/* add go to cart button */}
              <div>You have no orders</div>
            </div>
            )
        }
      </div>
    </div>
  )
}

export default Orders
