"use client";

import React, { useContext, useEffect, useRef, useState } from "react"
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { SocketContext } from "./Context";
import VideoPlayer from "./VideoPlayer";

function Call({ reciverData }) {

  const { answerCall, call, callAccepted, leaveCall, isCaller, setCallDialogOpened, callerData } = useContext(SocketContext);

  const recjetCall = () => {
    leaveCall();
    setCallDialogOpened(false);
  }


  return (


    <div
      className=" fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
      <div
        className="relative m-4 p-6 rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
        <div className="flex items-center justify-center p-4 font-sans text-2xl antialiased font-semibold  shrink-0 text-blue-gray-900">
          {isCaller ? <span className="mr-4 font-bold call-icons ">{callerData?.username}</span> :
            <span className="mr-4 font-bold call-icons ">{callerData?.name}</span>
          }
          <span>{callAccepted ? <p className="text-emerald-600 font-semibold">connected</p> : <p>Calling..</p>}</span>
        </div>
        <div className="flex items-center justify-center">
          {isCaller ? <img className="rounded-full w-[250px] m-4" src={callerData.profileImage && callerData.profileImage != '' ? callerData.profileImage : "/assets/userplace.jpg"}></img> :
            <img className="rounded-full w-[250px] m-4" src={callerData?.img && callerData?.img != '' ? callerData?.img : "/assets/userplace.jpg"}></img>
          }
        </div>

        <div className="flex flex-wrap items-center justify-center p-4 shrink-0 text-blue-gray-500">

          <button
            onClick={() => recjetCall()}
            className="p-3 mr-1 font-sans text-xs  bg-gradient-to-tr from-red-600 to-red-400 font-bold text-white uppercase transition-all rounded-full middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <CallEndIcon className="call-icons" />
          </button>

          {(!callAccepted && !isCaller) &&
            <button onClick={answerCall}
              className="middle none center rounded-full bg-gradient-to-tr from-green-600 to-green-400 p-3 ml-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              <CallIcon className="call-icons"  ></CallIcon>
            </button>

          }
        </div>
        {/* <VideoPlayer/> */}
      </div>
    </div>
  )
}

export default Call
