import '../asset/css/signup.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { errorToast, successToast } from '../Helper/Toster'

const Signup = () => {
  const [FormData, setFormData] = useState({});

  const Navigate = useNavigate();

  const handlechange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  const handleClick = async (e) => {
    if (!FormData.username && !FormData.password) {
      errorToast("All fields are required.")
    } else if (!FormData.username) {
      e.preventDefault();
      errorToast("Username is required")
    }
    else if (!FormData.password) {
      e.preventDefault();
      errorToast("Password is Required")
    }
    else if (!FormData.cpassword) {
      e.preventDefault();
      errorToast("confirm Password is Required")
    }
    else if (FormData.password !== FormData.cpassword) {
      e.preventDefault();
      errorToast('password and confirm password must be same.')
    }
    else {
      try {
        e.preventDefault();
        const data = { username: FormData.username, password: FormData.password }
        await axios.post(`${process.env.REACT_APP_HOST_URL}/signup`, data);
        successToast("Signup successfully!")
        Navigate('/login')
      } catch (error) {
        Navigate('/signup')
        console.log(error);
        errorToast(error.response.data)
      }
    }

  }

  return (
    <div className='ls'>
      <div className="main">
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input className='input' type="text" name="username" placeholder="Email / phone" required onChange={handlechange} />
            <input className='input' type="password" name="password" placeholder="Password" required onChange={handlechange} />
            <input className='input' type="password" name="cpassword" placeholder="confirm Password" required onChange={handlechange} />
            <button className='button' onClick={handleClick}>Sign up</button>
          </form>
        </div>

        <div className="login">
          <label htmlFor="chk" aria-hidden="true"><Link to="/login">Login</Link> </label>
        </div>
      </div>
    </div>
  )
}

export default Signup
