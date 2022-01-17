import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <div className='sign'>
        <Link to={'/login'}>Login</Link>
        <Link to={'/reg'}>Register</Link>
      </div>
    </div>
  )
}

export default App
