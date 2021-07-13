import React, { useEffect, useState } from 'react'
import { db, auth } from '../pages/LoginSignup/firebase'
import firebase from 'firebase'
//import { Input, Button } from '@material-ui/core'

//component for chat text registration in firebase

function SendMessage(props) {

    //important state variables

    const [msg, setMsg] = useState('')
    const collectionName = (props.user>props.contact) ? (props.contact+"****"+props.user) : (props.user+"****"+props.contact);
    useEffect(()=>{
         
    },[props.contact])
    
    //function that transfers the sent message to the respective dataBase

    async function sendMessage(e) {
        e.preventDefault()
        
        await db.collection('chats').doc(collectionName).collection('messages').add({
            text: msg,
            from: props.user,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        props.scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    
    return (
        <div className="sendMsg">
            <form onSubmit={sendMessage}>
                <div >
                    <input  style={{borderRadius:7}}placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button style={{borderRadius:7}} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
