import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './signup.css'
const Signup = () => {
  const [FormData, setFormData] = useState();

  const handlechange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = { username: FormData.username, password: FormData.password }

      const response = await axios.post(`${process.env.REACT_APP_HOST_URL}/signup`,data)
      
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="main">
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="username" placeholder="Email / phone" required="true" onChange={handlechange} />
            <input type="password" name="password" placeholder="Password" required="true" onChange={handlechange} />
            <input type="password" name="cpassword" placeholder="confirm Password" required="true" onChange={handlechange} />
            <button onClick={handleClick}>Sign up</button>
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
