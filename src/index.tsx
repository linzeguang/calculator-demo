/*
 * @Author: linzeguang
 * @Date: 2022-08-30 17:20:06
 * @LastEditTime: 2022-08-30 17:22:44
 * @LastEditors: linzeguang
 * @Description: React Main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import Providers from 'Providers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)
