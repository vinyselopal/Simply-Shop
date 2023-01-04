function Addresses ({ setSelector, selector, addresses, selectorOrder, address, setAddress }) {
  return (
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
  )
}

export default Addresses
