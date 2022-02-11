import './styles/App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Dashboard from './components/dashboard'
import Reg from './components/reg'
import Login from './components/login'
import Error from './components/err'
import Home from './components/home'


function App() {
  const url = process.env.REACT_APP_API_URL
  // const key = process.env.REACT_APP_OAUTH_KEY
  const [userDetail, setUserDetail] = useState()

  const navigate = useNavigate()

  const navStyle = (isActive) => {
    return{
      textDecoration: 'none',
      fontWeight: '600',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: isActive ? 'white' : 'grey',
      letterSpacing: '0.05em'
    }
  }

  const userLoggedIn = (loggedIn) =>{
    if(loggedIn) document.querySelector('.app-nav').style.display = 'none'
  }

  const userDetails = (data) => {
    setUserDetail(data)
    navigate('dashboard')
  }

  return (
    <div className="App">
      <nav className='app-nav'>
        <NavLink 
          to={'/login'}
          style={({isActive})=>navStyle(isActive)}
        >
          Login
        </NavLink>
        |
        <NavLink 
          to={'/register'}
          style={({isActive})=>navStyle(isActive)}
        >
          Register
        </NavLink>
      </nav>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='dashboard' element={<Dashboard userData={userDetail} api_url={url}/>} />
          <Route path='register' element={<Reg userLoggedIn={userLoggedIn} userData={userDetails}/>} />
          <Route path='login' element={<Login userLoggedIn={userLoggedIn} userData={userDetails}/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
