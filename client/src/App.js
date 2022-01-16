import './App.css'
import { useEffect, useState } from 'react'
import Reg from './reg'
import Login from './login'

const api_url = process.env.REACT_APP_API_URL

function App() {
  const [user, setUser] = useState(false)

  function sign(){
    setUser(prevState=> !prevState)
    const btn = document.querySelector('#sign')
    !user ? btn.textContent = 'Register'
    : btn.textContent = 'Login'
  }

  return (
    <div className="App">
      <div>
        <button id='sign' onClick={sign}>Login</button>
      </div>
      {!user ? <Reg url={api_url}/> : <Login url={api_url}/>}
    </div>
  )
}

export default App
