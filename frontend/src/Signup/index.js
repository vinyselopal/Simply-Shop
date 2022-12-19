import React from 'react'
import { Link } from 'react-router-dom'
import signup from './signup.module.css'

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
    <div className={signup.signup}>
      <div className='signup-usr'>
        <label>Email</label>
        <input type='text' className='signup-email' />
      </div>
      <div className='signup-pwd' />
      <label>Password</label>
      <input className='signup-password' name='password' type='password' />
      <label>Confirm Password</label>
      <input className='signup-confirmPassword' name='password' type='password' /><span><button>show</button></span>
      {/* <label>Upload your picture</label> */}
      {/* <input type="file" className="signup-imageUpload" name="imageUpload" /> */}
      <input type='button' className='signup-submit' onClick={signupHandler} defaultValue='Signup' />
      <Link to='/signin'>
        <p>signin</p>
      </Link>
    </div>
  )
}

export default SignUp
