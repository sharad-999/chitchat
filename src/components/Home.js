import './home.css'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../Helper/Toster';
import axios from 'axios';
import { BsSend } from 'react-icons/bs';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Home = () => {

  const Navigate = useNavigate();

  useEffect(() => {
    if(!cookies.get('jwt')){
      Navigate('/login')
      errorToast('plase Login to Access.')
    }else{
      const validateToken=()=>{
        const authToken=cookies.get('jwt');
        console.log('authToken', authToken)
        axios.post(`${process.env.REACT_APP_HOST_URL}/verifytoken`,{authToken})
        .then(response=>successToast((response.data.success)))
        .catch(error=>{
          console.log(error)
          cookies.remove('jwt');
          Navigate('/login');
          errorToast('Authentication Failed.please Re-login')
        })
      };
      validateToken();
    }
    // eslint-disable-next-line
  }, [])

  const hanldeOnclick=()=>{

  }

  return (
    <>
      <div className="chat-app">
        <div className="sidebar">
          <button className="new-chat-btn">+ New Chat</button>
        </div>
        <div className="chat-container">
          <div className="input-container">
            <input
              type="text"
              className="chat_input"
              placeholder="Send a message..."
              
            />
            <button className="send-btn" onClick={hanldeOnclick}><BsSend /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
