import { Link } from 'react-router-dom'

function OrderPlaced () {
  return (
    <div className='flex justify-center flex-column m-4'>
      <div className='flex justify-center'>
        <Link to='/'>
          <h3>Simply Shop</h3>
        </Link>
      </div>
      <div className='flex justify-center m-4 text-xl'>
        Order Placed.
      </div>
    </div>
  )
}

export default OrderPlaced
