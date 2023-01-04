import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { passwordIsValid, emailIsValid } from '../utils'
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emptyFlag, setEmptyFlag] = useState(false)
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)

  async function signupHandler () {
    if (email === '' || password === '') {
      return setEmptyFlag(true)
    }

    if (password !== confirmPassword) {
      return setPasswordsDontMatch(true)
    }

    if (!emailIsValid(email)) {
      return setInvalidEmail(true)
    }

    if (!passwordIsValid(password)) {
      return setInvalidPassword(true)
    }

    const response = await fetch(
      'http://localhost:8000/register',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    )
    const message = await response.json()
    if (response.ok) window.location.href = 'http://localhost:3000/api/signin'
    else {
      document.querySelector('body').innerHTML = message
    }
  }

  return (
    <>
      <Link
        to='/'
        className='flex flex-col justify-center items-center text-3xl no-underline text-black mt-7'
      >
        Simply Shop
      </Link>
      <div className='m-auto w-96 p-4 border-2 border-solid'>
        <strong><h2>Sign Up</h2></strong>
        <div className='signup-usr'>
          <div>Email</div>
          <input
            type='text'
            className='signup-email border-2 border-solid w-full'
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='signup-pwd' />
        <div>Password</div>
        <input
          className='signup-password signin-password border-2 border-solid w-full'
          onChange={(event) => setPassword(event.target.value)}
          name='password'
          type='password'
        />
        <div>Confirm Password</div>
        <input
          className='signup-confirmPassword border-2 border-solid w-full'
          onChange={(event) => setConfirmPassword(event.target.value)}
          name='password'
          type='password'
        />
        <span><button>show</button></span>
        <input
          type='button'
          className='signup-submit bg-amber-400 w-full mt-4'
          onClick={signupHandler}
          defaultValue='Signup'
        />
        <Link to='/signin'>
          <p>signin</p>
        </Link>
        {
          emptyFlag
            ? (
              <div className='signin-error text-red-400'>
                <strong><p>empty email or password</p></strong>
              </div>
              )
            : null
        }
        {
          passwordsDontMatch
            ? (
              <div className='signin-error text-red-400'>
                <p>Passwords dont match</p>
              </div>
              )
            : null
        }
        {
          invalidPassword
            ? (
              <div className='signin-error text-red-400'>
                <p>Type stronger password</p>
              </div>
              )
            : null
        }
        {
          invalidEmail
            ? (
              <div className='signin-error text-red-400'>
                <p>Invalid email</p>
              </div>
              )
            : null
        }

      </div>
    </>
  )
}

export default SignUp
