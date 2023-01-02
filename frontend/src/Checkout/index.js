import { useEffect, useState } from 'react'
import { createOrder, cancelOrder, getUserAddresses } from '../apis'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setOrder, setOrderAddress, setOrderExpectedDelivery, setOrderPaymentMethod } from '../redux/slice'
import { useSelectorWrapper } from '../utils'

function Checkout () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelectorWrapper('cart')

  const [addresses, setAddresses] = useState([])
  const paymentMethods = ['Cash on delivery']

  useEffect(() => {
    (async () => await populateAddresses())()
    dispatch(setOrder({
      products,
      expectedDelivery: '2023-01-31',
      productsIdArray: products.map(product => product.item.id),
      paymentAmount: 500
    }))
  }, [])

  const populateAddresses = async () => {
    const addresses = await getUserAddresses()
    setAddresses(addresses)
  }
  const selectorOrder = ['address', 'payment', 'placeOrder']

  const selectorsButtonsMapping = {
    address: {
      buttonText: 'use this address',
      storeField: () => dispatch(setOrderAddress(address))
    },
    payment: {
      buttonText: 'use this payment method',
      storeField: () => dispatch(setOrderPaymentMethod(paymentMethod))
    },
    placeOrder: {
      buttonText: 'place your order and pay',
      storeField: () => handlePlaceOrder()
    }
  }

  const total = 500

  const [address, setAddress] = useState(addresses[0])
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])
  const [selector, setSelector] = useState(0)

  const handlePlaceOrder = async () => {
    navigate('/order_placed')
  }
  const storeFieldAndContinue = () => {
    selectorsButtonsMapping[selectorOrder[selector]].storeField()
    setSelector(selector => selector + 1)
    console.log(selector)
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
          <div className='checkout_address_container'>
            <button onClick={() => setSelector(0)}>
              <h4>1. Select a delivery address</h4>
            </button>
            {
            selectorOrder[selector] === 'address' && addresses
              ? (
                <div className='border-2 border-solid flex flex-col p-4'>
                  {
                    addresses.map((ele, index) =>
                      (
                        <div key={index}>
                          <input
                            type='radio'
                            value={ele}
                            name='address'
                            checked={address === ele}
                            onChange={() => setAddress(ele)}
                          /> {ele.address}
                        </div>
                      )

                    )
                  }
                </div>
                )
              : null
            }
          </div>
          <div className='checkout_payment_container'>
            <button onClick={() => setSelector(1)}>
              <h4>2. Payment Method</h4>
            </button>
            {
            selectorOrder[selector] === 'payment'
              ? (
                <div className='border-2 border-solid flex flex-col p-4'>
                  {
                    paymentMethods.map((method, index) =>
                      (
                        <div key={index}>
                          <input
                            type='radio'
                            value={method}
                            name='payment method'
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                          /> {method}
                        </div>
                      )

                    )
                  }
                </div>
                )
              : null
            }
          </div>
        </div>
        <div className='order_summary basis-1/4 border-2 border-solid p-4 m-4'>
          <h4>Order Summary</h4>
          <div>Total Amount: Rs. {total}</div>
          <button
            className='bg-amber-500 p-2 mt-4 rounded-2'
            onClick={storeFieldAndContinue}
          >
            {selectorsButtonsMapping[selectorOrder[selector]].buttonText}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Checkout
