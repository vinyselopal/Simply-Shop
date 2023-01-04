import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../apis'
import { passwordIsValid, emailIsValid } from '../utils'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emptyFlag, setEmptyFlag] = useState(false)
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [registrationFailedMessage, setRegistrationFailedMessage] = useState(null)
  const [confirmationSentFlag, setConfirmationSentFlag] = useState(false)

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

    const registrationResponse = await registerUser(email, password)

    if (registrationResponse.statusCode === 202) {
      setConfirmationSentFlag(true)
      return
    }

    setRegistrationFailedMessage(registrationResponse.body.message)
  }

  if (confirmationSentFlag) {
    return (
      <div className='flex justify-center flex-column m-4'>
        <div className='flex justify-center'>
          <Link to='/'>
            <h3>Simply Shop</h3>
          </Link>
        </div>
        <div className='flex justify-center m-4 text-xl'>
          Email Confirmation sent to {email}
        </div>
        <div className='flex justify-center'>
          <Link to='/signin'>
            sign in
          </Link>
        </div>
      </div>
    )
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
        {
          registrationFailedMessage
            ? (
              <div className='signin-error text-red-400'>
                <p>{registrationFailedMessage}</p>
              </div>
              )
            : null
        }
      </div>
    </>
  )
}

export default SignUp
