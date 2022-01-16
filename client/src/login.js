import { func } from 'joi'
import { useState, useEffect } from 'react'

function Login({url}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [userData, setUserData] = useState('')
    const [login, setLogin] = useState(false)

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
        if(formData.email && formData.password){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            fetch(`${url}/api/login`, requestOptions)
            .then(res => res.json())
            .then(data =>{
                setUserData(data)
                setLogin(true)
            })
        }else{
            console.log('Missing field')
        }
    }

    function showAllUsers(){
        const requestOptions = {
            method: 'GET',
            headers: { 'auth-token': userData.token},
        }
        fetch(`${url}/api/users`, requestOptions)
        .then(res => res.json())
        .then(data =>console.log(data))
    }

    return (
        <div className='login-page'>
            { !login ? 
                <form>
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
                    <button onClick={handleSubmit}>SUBMIT</button>
                </form>
            :
                <div>
                    <h1 className='greeting'>Welcome back, {userData.name}</h1>
                    <button onClick={showAllUsers}>See other users</button>
                </div>
            }
        </div>
    )
}

export default Login
