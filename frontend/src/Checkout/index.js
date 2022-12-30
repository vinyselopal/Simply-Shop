import { useEffect, useState } from 'react'
import { createOrder, cancelOrder } from '../apis'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setOrder } from '../redux/slice'
import { useSelectorWrapper } from '../utils'

function Checkout () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const total = useSelectorWrapper('cart')
  const total = 500
  const addresses = ['add1', 'add2']
  return (
    <div>
      <Link to='/' className='no-underline text-black pl-5 position-absolute'><h2>Simply Shop</h2></Link>

      <div className='flex bg-gray-300 justify-center p-2'>
        <h2 className='pl-5'>Checkout</h2>
      </div>
      <div className='flex flex-row justify-center m-4'>
        <div className='flex flex-col m-4 basis-3/4'>
          <div className='checkout_address_container'>
            <h4>1. Select a delivery address</h4>
            <div className='border-2 border-solid flex flex-col p-4'>

              {
                addresses.map((address, index) => (
                 
                ))
              }
            </div>
          </div>
          <div className='checkout_payment_container'>
            <h4>2. Payment Method</h4>
          </div>
        </div>
        <div className='order_summary basis-1/4 border-2 border-solid p-4 m-4'>
          <h4>Order Summary</h4>
          <div>Total Amount: Rs. {total}</div>
          <button className='bg-amber-500 p-2 mt-4 rounded-2'>Place your order and pay</button>
        </div>
      </div>

    </div>
  )
}

export default Checkout
