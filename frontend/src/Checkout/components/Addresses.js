function Addresses ({ addresses, address, setAddress }) {
  return (
    <div className='checkout_address_container'>
      <h4>1. Select a delivery address</h4>
      {
        addresses.length
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
  )
}

export default Addresses
