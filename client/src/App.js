import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import Home from './components/home'

function App() {
  const loggedIn = false

  function navStyle(isActive){
    return{
      textDecoration: 'none',
      fontWeight: '600',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: isActive ? 'blue' : 'grey'
    }
  }

  return (
    <div className="App">
      {!loggedIn ?
        <>
          <nav className='sign'>
            <NavLink 
              to={'/login'}
              style={({isActive})=>navStyle(isActive)}
            >
              Login
            </NavLink>
            <NavLink 
              to={'/register'}
              style={({isActive})=>navStyle(isActive)}
            >
              Register
            </NavLink>
          </nav>
          <Outlet/>
        </>
      :
        <Home/>
      }
    </div>
  )
}

export default App
