import React from 'react'
import {
  Link,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken, setUserID } from '../redux/cartSlice'
import signin from './signin.module.css'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  async function loginHandler () {
    const userID = document.getElementsByClassName('signin-userID')[0].value
    const password = document.getElementsByClassName('signin-password')[0].value

    if (userID === '' || password === '') {
      const errorElement = document.getElementsByClassName('signin-error')[0]
      errorElement.innerHTML = '<p>empty username or password</p>' // use conditional render
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
      console.log('access token', creds.accessToken)
      localStorage.setItem('token', JSON.stringify(creds.accessToken))
      dispatch(setToken(creds.accessToken))
      dispatch(setUserID(userID))

      const checkout = searchParams.get('checkout')
      if (checkout) navigate('/checkout')
      else navigate('/')
    } else {
      document.body.innerHTML = creds // dont use innerhtml and look at naming
    }
  }

  return (
    <>
      <Link to='/' className='flex flex-col justify-center items-center text-3xl no-underline text-black mt-7'>Amazon</Link>
      <div className='m-auto w-96 p-4 border-2 border-solid'>
        <strong><h3>Sign In</h3></strong>
        <div className={signin['signin-usr']}>
          <div>User ID</div>
          <input type='text' className='signin-userID border-2 border-solid w-full' />
        </div>
        <div className={signin['signin-pwd']}>
          <div>Password</div>
          <input className='signin-password border-2 border-solid w-full' name='password' type='password' />
        </div>

        <input type='button' className='bg-amber-400 w-full mt-4' onClick={loginHandler} defaultValue='Sign in' />
        {/* <button className="signin-guestSignin" >Sign in as guest</button> */}
        <Link to='/signup'>
          <p>signup</p>
        </Link>
        <div className='signin-error' />
      </div>
    </>
  )
}

export default SignIn
