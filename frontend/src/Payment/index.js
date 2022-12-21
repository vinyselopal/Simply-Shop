function Payment () {
  function confirmationHandler () {
    // add payment-done and deadline (+ 5 days) to order in DB
  }
  return (
    <div className='flex justify-center'>
      <button className='bg-amber-500 m-4 p-2' onClick={confirmationHandler}>Pay</button>
    </div>
  )
}

export default Payment
