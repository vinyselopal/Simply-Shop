import React from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken, setUserID } from '../redux/cartSlice'
import signin from './signin.module.css'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

      navigate('/')
      window.location.reload() // remove
    } else {
      document.body.innerHTML = creds // dont use innerhtml and look at naming
    }
  }

  return (
    <div className={signin.signin}>
      <div className={signin['signin-usr']}>
        <label>User ID</label>
        <input type='text' className='signin-userID' />
      </div>
      <div className={signin['signin-pwd']}>
        <label>Password</label>
        <input className='signin-password' name='password' type='password' />
      </div>

      <input type='button' className={signin['signin-submit']} onClick={loginHandler} defaultValue='Signin' />
      {/* <button className="signin-guestSignin" >Sign in as guest</button> */}
      <Link to='/signup'>
        <p>signup</p>
      </Link>
      <div className='signin-error' />
    </div>
  )
}

export default SignIn
