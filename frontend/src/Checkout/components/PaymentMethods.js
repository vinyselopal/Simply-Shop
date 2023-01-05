function PaymentMethods ({ setSelector, selector, selectorOrder, paymentMethods, paymentMethod, setPaymentMethod }) {
  return (
    <div className='checkout_payment_container'>
      <h4>2. Payment Method</h4>
      {
        paymentMethods
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
  )
}

export default PaymentMethods
