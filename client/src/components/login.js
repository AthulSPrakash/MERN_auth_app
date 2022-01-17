import { useState } from 'react'
import { Link } from 'react-router-dom'
import Home from './home' 

function Login() {
    const url = process.env.REACT_APP_API_URL
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
            }).catch(err => console.log(err))
        }else{
            console.log('Missing field')
        }
    }

    return (
        <>
        { !login ? 
            <div className='login-page'>
                <header className='login-header'>
                    <Link to={'/'}>back to home</Link>
                    <Link to={'/reg'}>not a user? click here to sign up</Link>
                </header>
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
                    <button onClick={handleSubmit}>SUBMIT</button>
                </form>
            </div>
            :
            <Home user={userData.name} token={userData.token} api_url={url}/>
        }
        </>
    )
}

export default Login
