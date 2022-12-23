import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  async function signupHandler () {
    const email = document.getElementsByClassName('signup-email')[0].value
    const password = document.getElementsByClassName('signup-password')[0].value
    const confirmPassword = document.getElementsByClassName('signup-confirmPassword')[0].value

    if (password !== confirmPassword) {
      document.querySelector('body').innerHTML = 'passwords dont match'
      return
    }

    const response = await fetch(
      'http://localhost:8000/register',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    )
    const message = await response.json()
    if (response.ok) window.location.href = 'http://localhost:3000'
    else {
      document.querySelector('body').innerHTML = message
    }
  }

  return (
    <>
      <Link to='/' className='flex flex-col justify-center items-center text-3xl no-underline text-black mt-7'>Simply Shop</Link>
      <div className='m-auto w-96 p-4 border-2 border-solid'>
        <strong><h2>Sign In</h2></strong>
        <div className='signup-usr'>
          <div>Email</div>
          <input type='text' className='signup-email border-2 border-solid w-full' />
        </div>
        <div className='signup-pwd' />
        <div>Password</div>
        <input className='signup-password signin-password border-2 border-solid w-full' name='password' type='password' />
        <div>Confirm Password</div>
        <input className='signup-confirmPassword border-2 border-solid w-full' name='password' type='password' /><span><button>show</button></span>
        {/* <label>Upload your picture</label> */}
        {/* <input type="file" className="signup-imageUpload" name="imageUpload" /> */}
        <input type='button' className='signup-submit bg-amber-400 w-full mt-4' onClick={signupHandler} defaultValue='Signup' />
        <Link to='/signin'>
          <p>signin</p>
        </Link>
      </div>
    </>
  )
}

export default SignUp
