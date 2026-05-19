import './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie'
import {useNavigate, Navigate, Link, replace} from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [incorrectMessage ,setIncoorectMessage] = useState('')

    const onChangeEmail = (event) => {
        setemail(event.target.value)
        setIncoorectMessage('')
    }
    const onChangePassword = (event) => { 
        setPassword(event.target.value)
        setIncoorectMessage('')
    }
    const OnBluremail = () => {
        if (email === '') {
            document.getElementById('nameError').textContent = '*Please Enter the Name'
        }
        else {
            document.getElementById('nameError').textContent = ''
        }
    }
    const onblurpassword = () => {
        if (password === '') {
            document.getElementById('passwordError').textContent = '*Please Enter the Password'
        }
        else {
            document.getElementById('passwordError').textContent = ''
        }
    }
    const formSubmiting = (event) => {
        event.preventDefault()
        if (email === "" || password === "") {
            if (email === '') {
                document.getElementById('nameError').textContent = '*Please Enter the Name'
            }
            if (password === '') {
                document.getElementById('passwordError').textContent = '*Please Enter the Password'
            }
        }
        else {
            const data = JSON.parse(localStorage.getItem(JSON.stringify(email)))
            if (data === null) {
                setIncoorectMessage('Email not found, please sign up')
            }  
            else {
                if (data.email === email && data.confirmpassword === password) {
                    Cookies.set('Access_Token', 'Access_Permited', {expires:30})
                    navigate('/', {replace:true})
                    setemail('')
                    setPassword('')
                }
                else{
                    if (data.confirmpassword !== password) {
                        setIncoorectMessage('*Incorrect password')
                    }
                }
            }
        }
    }

    const onclickCreateaccount = () => {
        navigate('/signup', {replace:true})
    }

    const access_token = Cookies.get('Access_Token')
    if (access_token !== undefined) {
        return <Navigate to='/' replace />
    }
    else {
        return(
            <div className='loginPage'>        
                    <img src='https://static.vecteezy.com/system/resources/previews/053/223/605/non_2x/a-bus-and-a-train-are-next-to-a-globe-vector.jpg' className='loginImage' alt='login page img' />            
                <form className='formSection' onSubmit={formSubmiting}>
                    <div className="inputBox">
                        <h1 className='label'>EMAIL</h1>
                        <input type="text" placeholder="EMAIL" className='input' onChange={onChangeEmail} onBlur={OnBluremail} value={email} />
                        <p className='error-message' id='nameError'></p>
                    </div>
                    <div className="inputBox">
                        <h1 className='label'>PASSWORD</h1>
                        <input type="password" placeholder="PASSWORD" className='input' onChange={onChangePassword} onBlur={onblurpassword} value={password} />
                        <p className='error-message' id='passwordError'></p>
                    </div>
                    <p className='error-message'>{incorrectMessage}</p>
                    <div className='btn-container'>
                        <button className='loginBtn' type='submit'>  Login </button>
                    </div>
                    <div className="buttonContainer">
                        <button className="signupBtn" onClick={onclickCreateaccount}>
                            Sign Up
                        </button>
                    </div>
                </form>  
            </div>
            )
    }
}
export default Signin