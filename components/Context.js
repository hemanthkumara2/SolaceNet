'use client'
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useSession } from 'next-auth/react';

const SocketContext = createContext();

// const socket = io('http://localhost:9001');
 const socket = io('https://chatappsocket-1c62b372a193.herokuapp.com/');

const ContextProvider = ({ children }) => {

 

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callDialogOpened, setCallDialogOpened] = useState(false);
  const [isCaller, setIsCaller] = useState(false);
  const [callerData, setCallerData] = useState({});
  const [stream, setStream] = useState();
  const [name, setName] = useState("name");
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const audioRef = useRef(null);

  useEffect(() => {
    const reconnect = async () => {
      try {
        socket.disconnect(); // Disconnect in case of existing connection
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        
          // If no stored ID, obtain a new one on connection
          socket.on('connect', () => {
            const newID = socket.id;
            setMe(newID);
            const logedUserId= localStorage.getItem('userId');
            if(logedUserId){
              updateUserSocket(logedUserId,newID)
            }
            
            console.log("New connection ID:", newID);
          });
          socket.connect();
        
      } catch (error) {
        console.error("Error reconnecting:", error);
      }
    };

    reconnect();
    
    turnOnMedia();
    // socket.on('me', (id) => {setMe(id); console.log("ID:",id);});

    socket.on('callUser', ({ from, user, signal }) => {
      console.log(">>>>>",user);
      setCall({ isReceivingCall: true, from, name, signal });
      setCallerData(user);
      audioRef.current.play();
    });
  },[socket]);

  // useEffect(()=>{
  //   if(callDialogOpened){
  //     turnOnMedia()
  //   }
    
  // },[callDialogOpened])

  const turnOnMedia=()=>{
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((currentStream) => {
      setStream(currentStream);
      

      // setTimeout(()=>{
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
          console.log("myVideo.current is conneted.");
        } else {
          console.warn("myVideo.current is not available yet.");
        }
      // },1000)

     
    });
  }


  const updateUserSocket =async(userId,s_id)=>{
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:userId,socketId:s_id}),
    });
     if(res){
      console.log(res);
     }
  }
  

  const answerCall = () => {
    setCallAccepted(true);
    audioRef.current.pause()
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id,calluser123) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {

      socket.emit('callUser', { userToCall: id, signalData: data, from: me, user:{name:calluser123.username,img:calluser123.profileImage} });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    audioRef.current.pause()
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      callDialogOpened, 
      setCallDialogOpened,
      isCaller, 
      setIsCaller,
      turnOnMedia,
      callerData, 
      setCallerData,
      audioRef
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
