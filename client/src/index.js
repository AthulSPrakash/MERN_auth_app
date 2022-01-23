import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import Home from './components/home'
import Login from './components/login'
import Reg from './components/reg'
import Error from './components/err'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} >
        <Route path='home' element={<Home />} />
        <Route path='register' element={<Reg />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Error/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
