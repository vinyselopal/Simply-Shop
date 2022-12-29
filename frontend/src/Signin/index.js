import React, { useState } from 'react'
import {
  Link,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/slice'
import signin from './signin.module.css'
import { emailIsValid } from '../utils'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [email, updateEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emptyFlag, setEmptyFlag] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [loginFailMessage, setLoginFailMessage] = useState('')

  async function loginHandler () {
    if (email === '' || password === '') {
      setEmptyFlag(true)
      return
    }
    if (!emailIsValid(email)) {
      return setInvalidEmail(true)
    }

    const response = await fetch('http://localhost:8000/login',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

    const parsedResponse = await response.json()

    if (response.status === 404) {
      setLoginFailMessage(parsedResponse)
      return
    }

    localStorage.setItem('token', JSON.stringify(parsedResponse.accessToken))
    dispatch(setToken(parsedResponse.accessToken))

    const checkout = searchParams.get('checkout')
    if (checkout) navigate('/checkout')
    else navigate('/')
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
        <strong><h3>Sign In</h3></strong>
        <div className={signin['signin-usr']}>
          <div>Email</div>
          <input
            type='text'
            className='signin-Email border-2 border-solid w-full'
            onChange={(event) => updateEmail(event.target.value)}
          />
        </div>
        <div className={signin['signin-pwd']}>
          <div>Password</div>
          <input
            className='signin-password border-2 border-solid w-full'
            name='password'
            type='password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <input
          type='button'
          className='bg-amber-400 w-full mt-4'
          onClick={() => loginHandler()}
          defaultValue='Sign in'
        />
        <Link to='/signup'>
          <p>signup</p>
        </Link>
        {
          emptyFlag
            ? (
              <div className='signin-error text-red-400'>
                <strong><p>empty user-name or password</p></strong>
              </div>
              )
            : null
        }
        {
          loginFailMessage
            ? (
              <div className='signin-error text-red-400'>
                <p>{loginFailMessage}</p>
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

export default SignIn
