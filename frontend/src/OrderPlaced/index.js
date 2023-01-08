import { Link } from 'react-router-dom'

function OrderPlaced () {
  return (
    <div className='m-auto flex justify-center'>
      <div className='flex justify-center flex-column m-4 bg-slate-200 w-3/5 mt-30 p-4'>
        <div className='flex justify-center'>
          <Link to='/'>
            <h3>Simply Shop</h3>
          </Link>
        </div>
        <div className='flex justify-center m-4 text-xl'>
          Order Placed.
        </div>
      </div>
    </div>
  )
}

export default OrderPlaced
