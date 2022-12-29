import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { CookiesProvider } from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.querySelector('.root'))

root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
)
