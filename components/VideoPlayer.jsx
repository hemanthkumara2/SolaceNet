'use client'
import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@mui/material';
import { SocketContext } from './Context';





const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);


  return (
    <div>
      {stream && (
            <video className='dispaly-none' playsInline muted ref={myVideo} autoPlay  />
      )}
      {callAccepted && !callEnded && (
            <video className='dispaly-none' playsInline ref={userVideo} autoPlay  />
      )}
    </div>
  );
};

export default VideoPlayer;
