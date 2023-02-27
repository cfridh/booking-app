import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function RegisterPage() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function registerUser(e) {
        e.preventDefault()
        axios.post('/register',{
            name,
            email,
            password
        } )
        console.log('Registering user')
    }
    return (<>
        <div className='mt-4 grow flex items-center justify-around'>
          <div className="mb-64">
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input type="text" placeholder='Firstname Lastname' 
                value={name} 
                onChange={e => setName(e.target.value) } />
          <input type="email" placeholder='your@email.com'
                value={email} 
                onChange={e => setEmail(e.target.value) } />
          <input type="password" placeholder='password' 
                value={password} 
                onChange={e => setPassword(e.target.value) }/>
          <button className='primary' type='submit'>Register</button>
          <div className="text-centerpy-2">
            Already a member?   <Link className='underline text-black' to ={"/login"} >Login</Link> </div>
        </form>
        </div>
        </div>
        </>
      )
}

export default RegisterPage