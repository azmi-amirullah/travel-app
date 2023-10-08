import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './stores/store'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'moment/locale/id'
import moment from 'moment'
moment.locale('id')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
)
