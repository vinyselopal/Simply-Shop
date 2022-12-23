import React, { useState } from 'react'
import {
  Link,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken, setUserID } from '../redux/slice'
import signin from './signin.module.css'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [userID, updateUserID] = useState('')
  const [password, setPassword] = useState('')
  const [emptyFlag, setEmptyFlag] = useState(false)
  const [loginFailFlag, setLoginFailFlag] = useState(false)

  async function loginHandler () {
    if (userID === '' || password === '') {
      setEmptyFlag(true)
      return
    }
    const response = await fetch('http://localhost:8000/login',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userID, password })
      })

    const creds = await response.json()

    if (response.status === 200) {
      localStorage.setItem('token', JSON.stringify(creds.accessToken))
      dispatch(setToken(creds.accessToken))
      dispatch(setUserID(userID))

      const checkout = searchParams.get('checkout')
      if (checkout) navigate('/checkout')
      else navigate('/')
    } else {
      setLoginFailFlag(true)
    }
  }

  return (
    <>
      <Link to='/' className='flex flex-col justify-center items-center text-3xl no-underline text-black mt-7'>
        Simply Shop
      </Link>
      <div className='m-auto w-96 p-4 border-2 border-solid'>
        <strong><h3>Sign In</h3></strong>
        <div className={signin['signin-usr']}>
          <div>User ID</div>
          <input
            type='text' className='signin-userID border-2 border-solid w-full'
            onChange={(event) => updateUserID(event.target.value)}
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
          loginFailFlag
            ? (
              <div className='signin-error text-red-400'>
                <p>Invalid username or password</p>
              </div>
              )
            : null
        }
      </div>
    </>
  )
}

export default SignIn
