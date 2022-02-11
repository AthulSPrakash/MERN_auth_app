import '../styles/sign.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

function Login({userLoggedIn, userData}) {

    const url = process.env.REACT_APP_API_URL
    const clientId = process.env.REACT_APP_OAUTH_ID
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

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
        if(formData.email && formData.password){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            fetch(`${url}/api/login`, requestOptions)
            .then(res => res.json())
            .then(data =>{
                userData(data)
            }).catch(err => console.log(err))
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
        <div className='login-page'>
            <nav className='login-nav'>
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
                    isSignedIn={true}
                    className='google'
                />
            </div>
            <p className='or'>OR</p>
            <form className='login-form'>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder='Email'
                    required={true}
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange}
                    placeholder='Password'
                    required={true}
                />
                <button 
                    className='sign-btn'
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
