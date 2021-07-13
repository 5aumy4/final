import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import Rodal from 'rodal';
import './Team2.css';
import 'bootstrap/dist/css/bootstrap.css';
import {db} from "../pages/LoginSignup/firebase";
import { Container, Row , Col } from 'react-bootstrap';
import Chat from './Chat';
import  'rodal/lib/rodal.css'
import camera from '../resources/Icons/camera.svg'
import camerastop from '../resources/Icons/camera-stop.svg'
import microphone from '../resources/Icons/microphone.svg'
import microphonestop from '../resources/Icons/microphone-stop.svg'
import share from '../resources/Icons/share.svg'
import hangup from '../resources/Icons/hang-up.svg'
import fullscreen from '../resources/Icons/fullscreen.svg'
import minimize from '../resources/Icons/minimize.svg'


//main video call component

function Team2() {

  //important state variables

  const scroll = useRef()
  const [list, setList] = useState()
  const [chatWith, setChatWith] = useState()
  const params = useParams();
  const TeamName = params.teamID;
  const Name = params.userID;
  const yourID = TeamName+"*****"+Name;
  //const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerName, setCallerName]= useState("");
  const [callingFriend, setCallingFriend] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [receiverID, setReceiverID] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [isfullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [toCall, setToCall] = useState()
  
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const myPeer=useRef();


  useEffect(() => {
    
    //socket connection established

    socket.current = io.connect("/", {
      query: {
        name: Name,
        team : TeamName
      }
    });

    //recieves the list of online users
    socket.current.on("allUsers", (usex) => {
      
      setUsers(usex);
      //console.log(users);
    })
    
    //recieves connection signal from another peer by server
    socket.current.on("hey", (data) => {
      console.log("call 1")
      setReceivingCall(true);
      //ringtoneSound.play();
      setCaller(data.from);
      setCallerName(data.from.split('*****')[1])
      setCallerSignal(data.signal);
    })

    //list of users on the team fetched from firebase

    db.collection('users').where('email','==',Name).get().then(obj=>{
      obj.docs.forEach(doc=>{
          doc.data().teams.forEach(team=>{
             if(team.teamID==params.teamID)setList(team.contacts);
            
          })
         
      })
  })

  }, [chatWith]);

  //html, when no video call is happening

  let landingHTML ;
  
    
    if(list){
      landingHTML = <>
      <Row><Col className='col-4'>
      <div style={{ display: 'block',  padding: 30,maxWidth:400,overflowY:"scroll" }}>
      <Row>
          <Col style={{
              
             borderRadius:10, 
             
             }}>
          <Row>
             
             <select className = "custom-select" style={{width:265, height:45, borderRadius:7, backgroundColor:"#6666dd", color:"white"}} 
             onChange={(e)=>{
                           setChatWith(e.target.value);
             }}>
             {console.log(list)}
                {list.map((contact)=>(
                    <option value = {contact.contactName}>
                    {contact.contactName.split('@')[0]}
                    </option>
                ))}
             </select>
          </Row>
          <Row>
              <div>
              
                  <button style={{
                        padding:7,
                        color : "white",
                        backgroundColor:"blueviolet",
                        width : 267,
                        position:"relative",
                    }}

                    onClick={() => callPeer(TeamName+"*****"+ `${chatWith ? chatWith : list[0].contactName}`)} className="primaryButton">Call {(chatWith ? chatWith : list[0].contactName).split('@')[0]}</button>
              </div>
          </Row>
          <Row style={{ 
             
             }} className='col-6'>
             <div style={{
             
             borderRadius:10
             }}>
             <Chat 
                user = {Name}
                contact = {chatWith ? chatWith : list[0].contactName}
             ></Chat></div>
          </Row>
          </Col>
      </Row>
  </div>
  </Col>
  
  <Col>
    <div>
      
    </div>
  </Col>
  </Row>
  </>
  }
  else landingHTML= <><h1>loading</h1></>
    
  //function that is called when the user calls a contact

  function callPeer(id) {
    setToCall(id.split('*****')[1]);
    

    if(id!=='' && id!==yourID){

      //the media objects of the user are accessed

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        setCallingFriend(true)
        setCaller(id)
        if (userVideo.current) {
          console.log("uservid on");
          userVideo.current.srcObject = stream;
        }

        //peer created on the caller's side, that would send signals and streams
        const peer = new Peer({
          initiator: true,
          trickle: false,
          config: {
    
            iceServers: [
                
            ]
        },
          stream: stream,
        });

        myPeer.current=peer;
    
        //on generation of the signal, the following event is emitted
        peer.on("signal", data => {
          socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        //on recieving a stream from the reciever
    
        peer.on("stream", stream => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        //error handling

        peer.on('error', (err)=>{
          endCall()
        })
        
        //if the person being called is not online

        socket.current.on("notOnline",()=>{
          setModalMessage('We think the username entered is wrong. Please check again and retry!')
          setModalVisible(true);
          return;
        })

        //when the call is accepted 
    
        socket.current.on("callAccepted", signal => {
          setCallAccepted(true);
          peer.signal(signal);
        })

        //when the reciever hangs up

        socket.current.on('close', ()=>{
          window.location.reload()
        })

        //on rejetion
  
        socket.current.on('rejected', ()=>{
          window.location.reload()
        })
      })
      .catch(()=>{
        setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use MyClone.')
        setModalVisible(true)
      })
    } else {
      setModalMessage('We think the username entered is wrong. Please check again and retry!')
      setModalVisible(true)
      return
    }
  }

  //function invoked on call acceptance

  function acceptCall() {
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }


      setCallAccepted(true);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });

      myPeer.current=peer

      peer.on("signal", data => {
        socket.current.emit("acceptCall", { signal: data, to: caller })
      })

      peer.on("stream", stream => {
        partnerVideo.current.srcObject = stream;
      });

      peer.on('error', (err)=>{
        endCall()
      })

      peer.signal(callerSignal);

      socket.current.on('close', ()=>{
        window.location.reload()
      })
    })
    .catch(()=>{
      setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use MyClone.')
      setModalVisible(true)
    })
  }

  //function to reject an incoming call

  function rejectCall(){
    //ringtoneSound.unload();
    setCallRejected(true)
    socket.current.emit('rejected', {to:caller})
    window.location.reload()
  }
  
   //function executed upon end call

  function endCall(){
    myPeer.current.destroy()
    socket.current.emit('close',{to:caller})
    window.location.reload()
  }

  //funtion invoked when screen share is enabled

  function shareScreen(){
    navigator.mediaDevices.getDisplayMedia({cursor:true})
    .then(screenStream=>{
      myPeer.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
      userVideo.current.srcObject=screenStream
      screenStream.getTracks()[0].onended = () =>{
      myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
      userVideo.current.srcObject=stream
      }
    })
  }

  //enables the mute and unmute feature

  function toggleMuteAudio(){
    if(stream){
      setAudioMuted(!audioMuted)
      stream.getAudioTracks()[0].enabled = audioMuted
    }
  }

  //enables the video on and off feature

  function toggleMuteVideo(){
    if(stream){
      setVideoMuted(!videoMuted)
      stream.getVideoTracks()[0].enabled = videoMuted
    }
  }

  //function that decides whethere to display landinghtml or not

  function renderLanding() {
    if(!callRejected && !callAccepted && !callingFriend)
      return 'block'
    return 'none'
  }

  //function that decides whethere to display videocall format or not

  function renderCall() {
    if(!callRejected && !callAccepted && !callingFriend)
      return 'none'
    return 'block'
  }

  //stores the user video
  let UserVideo;
  if (stream) {
    UserVideo = (
      <video className="userVideo" playsInline muted ref={userVideo} autoPlay />
    );
  }
  
  //stores the parter video
  let PartnerVideo;
  if (callAccepted && isfullscreen) {
    PartnerVideo = (
      <video className="partnerVideo cover" playsInline ref={partnerVideo} autoPlay />
    );
  } else if (callAccepted && !isfullscreen){
    PartnerVideo = (
      <video className="partnerVideo" playsInline ref={partnerVideo} autoPlay />
    );
  }
  
  //incoming call message
  let incomingCall;
  if (receivingCall && !callAccepted && !callRejected) {
    console.log("you are getting a call")
    incomingCall = (
      <div className="incomingCallContainer">
        <div className="incomingCall flex flex-column">
          <div><span className="callerID">{caller}</span> is calling you!</div>
          <div className="incomingCallButtons flex">
          <button name="accept" className="alertButtonPrimary" onClick={()=>acceptCall()}>Accept</button>
          <button name="reject" className="alertButtonSecondary" onClick={()=>rejectCall()}>Reject</button>
          </div>
        </div>
      </div>
    )
  }

  //mute functionality

  let audioControl;
  if(audioMuted){
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      <img src={microphonestop} alt="Unmute audio"/>
    </span>
  } else {
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      <img src={microphone} alt="Mute audio"/>
    </span>
  }

  //video functionality

  let videoControl;
  if(videoMuted){
    videoControl=<span className="iconContainer" onClick={()=>toggleMuteVideo()}>
      <img src={camerastop} alt="Resume video"/>
    </span>
  } else {
    videoControl=<span className="iconContainer" onClick={()=>toggleMuteVideo()}>
      <img src={camera} alt="Stop audio"/>
    </span>
  }

  let screenShare=<span className="iconContainer" onClick={()=>shareScreen()}>
    <img src={share} alt="Share screen"/>
  </span>
  

  let hangUp=<span className="iconContainer" onClick={()=>endCall()}>
    <img src={hangup} alt="End call"/>
  </span>

  let fullscreenButton;  
  if(isfullscreen){
    fullscreenButton=<span className="iconContainer" onClick={()=>{setFullscreen(false)}}>
      <img src={minimize} alt="fullscreen"/>
    </span>
  } else {
    fullscreenButton=<span className="iconContainer" onClick={()=>{setFullscreen(true)}}>
      <img src={fullscreen} alt="fullscreen"/>
    </span>
  }

  //final render

  return (
    <>
      <div style={{display: renderLanding()}}>
      <Row><Col>{landingHTML}</Col></Row>
        
        <Rodal 
          visible={modalVisible} 
          onClose={()=>setModalVisible(false)} 
          width={20} 
          height={5} 
          measure={'em'}
          closeOnEsc={true}
        >
          <div>{modalMessage}</div>
        </Rodal>
        {incomingCall}
      </div>
      <div className="callContainer" style={{display: renderCall(),backgroundColor:"#888"}}>
        <Suspense fallback={<div>Loading...</div>}>
          
        </Suspense>
        <Row>
        <Col className='col-9'>
        <div className="partnerVideoContainer">
          {PartnerVideo}
        </div>
        <div className="userVideoContainer">
          {UserVideo}
        </div>
        <div className="controlsContainer flex">
          {audioControl}
          {videoControl}
          {screenShare}
          {hangUp}
        </div>
        </Col>
        <Col > 
           <h2>{callerName ? callerName : toCall}</h2>
           <Chat
             user = {Name}
             contact = {callerName ? callerName : toCall}
           />
        </Col>
        </Row>
      </div>
      
    </>
  )
}

export default Team2;