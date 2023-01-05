import { useEffect, useState } from 'react'
import { getUserAddresses, placeOrder } from '../apis'
import { Link, useNavigate } from 'react-router-dom'
import { useSelectorWrapper } from '../utils'
import Addresses from './components/Addresses'
import PaymentMethods from './components/PaymentMethods'
import { useDispatch } from 'react-redux'
import { setCart } from '../redux/slice'

function Checkout () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelectorWrapper('cart')

  const [addresses, setAddresses] = useState([])
  const [order, setOrder] = useState({})
  const [address, setAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const paymentMethods = ['Cash on delivery']

  useEffect(() => {
    populateAddresses()

    setOrder({
      expectedDelivery: '2023-01-31',
      productsIdArray: products.map(product => product.item.id),
      paymentAmount: 500
    })
  }, [])

  const populateAddresses = async () => {
    const addresses = await getUserAddresses()
    setAddresses(addresses)
  }

  const total = 500

  useEffect(() => {
    setOrder({ ...order, address, paymentMethod })
  }, [address, paymentMethod])

  const handlePlaceOrder = async () => {
    if (order.address && order.paymentMethod) {
      const orderID = await placeOrder(order)
      if (orderID) {
        dispatch(setCart([]))
        navigate('/order_placed')
      }
    }
  }

  return (
    <div>
      <Link
        to='/'
        className='no-underline text-black pl-5 position-absolute'
      >
        <h2>Simply Shop</h2>
      </Link>
      <div className='flex bg-gray-300 justify-center p-2'>
        <h2 className='pl-5'>Checkout</h2>
      </div>
      <div className='flex flex-row justify-center m-4'>
        <div className='flex flex-col m-4 basis-3/4'>
          <Addresses
            addresses={addresses}
            address={address}
            setAddress={setAddress}
          />
          <PaymentMethods
            paymentMethods={paymentMethods}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
        <div className='order_summary basis-1/4 border-2 border-solid p-4 m-4'>
          <h4>Order Summary</h4>
          <div>Total Amount: Rs. {total}</div>
          <button
            className='bg-amber-500 p-2 mt-4 rounded-2'
            onClick={handlePlaceOrder}
          >
            Place your order
          </button>
        </div>
      </div>

    </div>
  )
}

export default Checkout
