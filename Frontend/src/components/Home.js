import '../asset/css/home.css'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom';
import { errorToast, successToast } from '../Helper/Toster';
import axios from 'axios';
import { BsSend } from 'react-icons/bs';
import Cookies from 'universal-cookie';
import Messages from './Messages';
const cookies = new Cookies();

const Home = () => {

  const [prompt, setprompt] = useState()
  const [input, setinput] = useState()
  const [user, setuser] = useState()
  const [login,setlogin] =useState(true)
  const [limit,setlimit] =useState()

  const ref = useRef()
  const Navigate = useNavigate();
  const location=useLocation();
  // console.log('limit', limit)
  // console.log('location', location)

  useEffect(() => {
    if (!cookies.get('jwt')) {
      console.log('jwt not found');
      Navigate('/login')
      errorToast('plase Login to Access.')
    } else {
      console.log('jwt not found');
      const validateToken = () => {
        const authToken = cookies.get('jwt');
        axios.post(`${process.env.REACT_APP_HOST_URL}/verifytoken`, { authToken })
          .then(response => {
            successToast(response.data.success);
            setuser(response.data.user)
            setlimit(response.data.user.limit)
          })
          .catch(error => {
            console.log(error)
            cookies.remove('jwt');
            Navigate('/login');
            errorToast('Authentication Failed.please Re-login')
          })
      };
      
      validateToken();
    }
    // eslint-disable-next-line
  }, [login, limit])

  const hanldeOnclick = () => {
    setprompt(ref.current.value);
    ref.current.value=""
  }
  
  const handleOnchange = (e) => {
    setinput(e.target.value)
  }

  const handleLogout = (e) => {
    cookies.remove('jwt')
    setlogin(false)
  }
  
  const handleRefresh = (e) => {
    axios.patch(`${process.env.REACT_APP_HOST_URL}/refreshlimit`,{user})
      .then(res => { 
        successToast(res.data.success); 
        setuser(res.data.user); 
        setlimit(res.data.user.limit+5); 
        Navigate('/',{state:{hidden:false}})
      })
    .catch(error=>console.log('error', error))
  }

  return (
    <>
      <div className="chat-app">
        <div className="sidebar">
          <button className="new-chat-btn">+ New Chat</button>
          <button className="new-chat-btn" onClick={handleRefresh} disabled={false}>Refresh limit</button>
          <span className='limit'>Your Limit:{limit}</span>
          <button className="logout new-chat-btn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="chat-container">
          <div className='chat_message'>
            {
              <Messages 
                  inputvalue={prompt}
                  usr={"rfr"}
                  limit={limit}
                />
            }
          </div>
          <div className="input-container">
            <input
              ref={ref}
              type="text"
              name='prompt'
              className="chat_input"
              placeholder="Send a message..."
              onChange={handleOnchange}
              disabled={location?.state?.hidden}
            />
            <button className="send-btn" onClick={hanldeOnclick} disabled={input?.length > 0 ? false : true}><BsSend /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
