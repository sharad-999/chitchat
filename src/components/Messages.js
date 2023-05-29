import '../asset/css/messages.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { errorToast } from '../Helper/Toster';

const Messages = ({inputvalue,user}) => {

    const [notes,setnotes]=useState([]);
    const [ans, setans] = useState()

    useEffect(() => {
        if(inputvalue){
            if(notes.length===5){
                errorToast("You Reached your Trial limit")
            }else{
                axios.post(`${process.env.REACT_APP_HOST_URL}/chat`, { inputvalue,user})
                .then(res=>{setans(res.data.answer); console.log('res', res.data.answer)})
                .catch(err=>console.log('err', err))
            }
        }
    }, [user,inputvalue])

    useEffect(() => {   
        if (user) {
            axios.post(`${process.env.REACT_APP_HOST_URL}/fetchchat`, { user })
                .then(response => setnotes(response.data.notes))
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