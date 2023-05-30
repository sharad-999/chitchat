import '../asset/css/messages.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { errorToast } from '../Helper/Toster';
import { useLocation, useNavigate } from 'react-router-dom';

const Messages = ({inputvalue,user,limit}) => {

    const [notes,setnotes]=useState([]);
    const [ans, setans] = useState()
    const Navigate=useNavigate();
    const location=useLocation()

    useEffect(() => {
        if(inputvalue){
            // if(notes.length<=limit){
            //     Navigate('/',{state:{hidden:false}})
            //     return;
            // }else{
                axios.post(`${process.env.REACT_APP_HOST_URL}/chat`, { inputvalue,user})
                .then(res=>{
                    setans(res.data.answer);
                    console.log('note.length', notes.length)
                    if (notes.length+1 >= limit) {
                        Navigate('/', { state: { hidden: true } })
                        errorToast("You have Reached your Trial limit")
                    }else{
                        Navigate('/', { state: { hidden: false } })
                    }
                })
                .catch(err=>console.log('err', err))
                Navigate('/',{state:{hidden:false}})
            // }
        }
    }, [user,inputvalue])

    useEffect(() => {   
        if (user) {
            axios.post(`${process.env.REACT_APP_HOST_URL}/fetchchat`, { user })
                .then(response =>{ 
                    setnotes(response.data.notes);
                    // if (notes.length === limit) {
                    //     location.state.hidden = true;
                    // }
                })
                .catch(err => console.log('err', err))
        }
    }, [user,ans])
    
    return (
    <div>
        {
        notes.map((note,index)=>{
            return(
                <div key={index}>
                    <>
                    <div className="message-user">{note.question}</div>
                    <div className="message-ai">{note.answer}</div>
                    </>
                </div>
            )
        })}
    </div>
  )
}

export default Messages;