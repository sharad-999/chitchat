import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './signup.css'
const Signup = () => {
  const [FormData, setFormData] = useState();

  const handlechange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  const handleClick = () => {
    
  }

  return (
    <div>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="username" placeholder="Email / phone" required="true" onChange={handlechange} />
            <input type="password" name="password" placeholder="Password" required="true" onChange={handlechange} />
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
