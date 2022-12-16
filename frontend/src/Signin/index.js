import React from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'

import signin from './signin.module.css'

const SignIn = ({ setToken, setUserName, setUserID }) => {
  const navigate = useNavigate()
  async function loginHandler () {
    const userID = document.getElementsByClassName('signin-userID')[0].value
    const password = document.getElementsByClassName('signin-password')[0].value

    const response = await fetch('http://localhost:8000/login',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userID, password })
      })

    const creds = await response.json()

    if (response.status === 200) {
      setUserName(() => creds.user_name)
      setUserID(() => creds.user_id)
      setToken(() => creds.accessToken)
      localStorage.setItem('userName', JSON.stringify(creds.user_name))
      localStorage.setItem('userID', JSON.stringify(creds.user_id))
      localStorage.setItem('token', JSON.stringify(creds.accessToken))
      navigate('/chats')
      window.location.reload()
    } else {
      document.querySelector('body').innerHTML = creds
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
    </div>
  )
}

export default SignIn
