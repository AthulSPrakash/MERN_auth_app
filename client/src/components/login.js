import '../styles/sign.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Login({userLoggedIn, userData}) {

    const url = process.env.REACT_APP_API_URL

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e){
        setFormData(prevFormData=>{
            return({
                ...prevFormData,
                [e.target.name]: e.target.value
            })
        })
    }
    
    function handleSubmit(e){
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

    function navStyle(isActive){
        return{
          textDecoration: 'none',
          fontWeight: '600',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: isActive ? 'blue' : 'grey'
        }
    }    

    return (
        <div className='login-page'>
            <nav className='login-nav'>
                <NavLink 
                    to={'/'}
                    style={({isActive})=>navStyle(isActive)}
                >
                    Back to home
                </NavLink>
            </nav>
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
                    SUBMIT
                </button>
            </form>
        </div>
    )
}

export default Login
