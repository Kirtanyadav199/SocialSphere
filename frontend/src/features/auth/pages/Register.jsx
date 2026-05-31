import React from 'react'
import '../../styles/form.scss'
import {Link, useNavigate} from 'react-router'
import axios from 'axios'
import { useState } from 'react'
import {useAuth} from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Register = () => {

  const navigate = useNavigate()

  const {loading,handleRegister} = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if(loading){
    return (
      <main><h1>Loading...</h1></main>
    )
  }
  async function handleSubmit(e){
    e.preventDefault();

    await handleRegister(username,email,password)
    navigate('/')
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e)=>{setUsername(e.target.value)}}
          value={username}
           type="text"
           name="username" 
           placeholder='Enter Username'/>
          <input 
          onInput={(e)=>{setEmail(e.target.value)}}
          value={email}
          type="text" 
          name='email'
          placeholder='Enter Email' />
          <input 
          onInput={(e)=>{setPassword(e.target.value)}}
          value={password}
          type="password" 
          name='password' 
          placeholder='Enter Password' />
          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
