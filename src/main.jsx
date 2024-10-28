import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

axios.defaults.baseURL = "https://start21-backend.onrender.com/api"
axios.defaults.headers.common.Token = sessionStorage.getItem("token")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
   <App />
   <ToastContainer/>
   </BrowserRouter>
  </React.StrictMode>,
)
