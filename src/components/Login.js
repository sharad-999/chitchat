import './signup.css'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { errorToast, successToast } from '../Helper/Toster';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = () => {

  const [FormData, setFormData] = useState();

  const Navigate = useNavigate();

  useEffect(() => {
    if(cookies.get('jwt')){
      Navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  const handlechange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!FormData.username && !FormData.password){
      errorToast("All fields are required")

    }else if(!FormData.username){
      // e.preventDefault();
      errorToast("Username is required")
    }
    else if (!FormData.password) {
      // e.preventDefault();
      errorToast("Password is Required")
    }
    else{
      try {
        const data = { username: FormData.username, password: FormData.password }
        let response = await axios.post(`${process.env.REACT_APP_HOST_URL}/login`, data)
        if (response.data.accessToken) {
          // Set cookies
          let d = new Date();
          d.setTime(d.getTime() + (30 * 60 * 1000)); //30 minutes
          cookies.set('jwt', response.data.accessToken, { path: "/", expires: d })

          Navigate('/');
          successToast(response.data.success);
        }
      } catch (error) {
        console.log(error);
        errorToast(error.response.data)
      }
    }
  }

  return (
    <div className='ls'>
      <div className="main">
        <div className="signup">
          <form >
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input className='input' type="text" name="username" placeholder="Email / phone" required onChange={handlechange} />
            <input className='input' type="password" name="password" placeholder="Password" required onChange={handlechange} />
            <button className='button'  onClick={handleClick}>Login</button>
          </form>
        </div>
        <div className="login">
          <label htmlFor="chk" aria-hidden="true"><Link to="/signup">Sign up</Link> </label>
        </div>
      </div>
    </div>
  )
}

export default Login
