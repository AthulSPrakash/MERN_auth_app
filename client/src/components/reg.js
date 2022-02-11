import '../styles/sign.css'
import { useState } from 'react'
import { NavLink } from "react-router-dom"
import { GoogleLogin } from 'react-google-login'

function Reg({userLoggedIn, userData}) {

  const url = process.env.REACT_APP_API_URL
  const clientId = process.env.REACT_APP_OAUTH_ID
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPass: ''
  })
  const [regComplete, setRegComplete] = useState(false)

  const handleChange = (e) => {
    setFormData(prevFormData=>{
      return({
          ...prevFormData,
          [e.target.name]: e.target.value
      })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userLoggedIn(true)
    if(formData.username && formData.email 
      && formData.password 
      && formData.confirmPass){
      if(formData.confirmPass!==formData.password){
        console.log('mismatch')
      }else{
        const regData = {
          username: formData.username,
          email: formData.email ,
          password: formData.password 
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regData)
        }
        fetch(`${url}/api/register`, requestOptions)
        .then(res => res.json())
        .then(data => {
          setRegComplete(true)
        }).catch(err => console.log(err))
      }
    }else{
      console.log('Missing field')
    }
  }

  //Google auth
  const onSuccess = async res => {
    // console.log('[login success] User:', res)
    userLoggedIn(true)
    const token = {token: res.tokenId}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token)
    }
    fetch(`${url}/api/gauth`, requestOptions)
    .then(response => response.json())
    .then(data =>{
        userData(data)
    }).catch(err => console.log(err))
  }

  const onFailure = res => {
      console.log('[login failed] Res:', res)
  }
  //------------

  return (
    <>
    {!regComplete?
      <div className='reg-page'>
        <nav className='reg-nav'>
          <NavLink 
            to={'/'}
            className='home-btn'
          >
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </nav>
        <div className='gauth'>
          <GoogleLogin
            clientId={clientId}
            buttonText='Login with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            className='google'
            isSignedIn={true}
          />
        </div>
        <p className='or'>OR</p>
        <form className='reg-form'>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder='User Name'
            required={true}
            max={255}
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder='Email'
            required={true}
            max={255}
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder='Password'
            required={true}
            min={8}
          />
          <input 
            type="password"
            name='confirmPass'
            value={formData.confirmPass}
            onChange={handleChange}
            placeholder='Confirm Password'
            required={true}
            min={8}
          />
          <button className='sign-btn' onClick={handleSubmit}>Register</button>
        </form>
      </div>
      :
      <div className='greeting'>
        <h1 className='greeting-text'>Registration Successful</h1>
        <h2 className='greeting-name'>Welcome, {formData.username}</h2>
        <NavLink 
          to={'/login'}
          className='login-redirect'
        >
          Login to your account
        </NavLink>
      </div>  
    }
    </>
  )
}

export default Reg
