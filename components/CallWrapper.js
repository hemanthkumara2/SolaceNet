'use client'

import React, { useContext, useEffect, useRef, useState } from "react"
import { ContextProvider, SocketContext } from "./Context";
import Call from "@components/call";
import VideoPlayer from "./VideoPlayer";


function CallWrapper() {

    const { callDialogOpened, setCallDialogOpened, call, callEnded, setIsCaller, setCallerData,audioRef } = useContext(SocketContext);

    useEffect(() => {

        if (call.isReceivingCall) {
            // turnOnMedia();

            // setTimeout(()=>{
            setIsCaller(false);
            setCallDialogOpened(call.isReceivingCall)

            // },2000)

        }
        // if(callEnded){
        //     setCallerDialogOpen(false);
        // }

    }, [call.isReceivingCall, callEnded])

    return (

        <div>
            {

                callDialogOpened &&
                <Call callerData={""} reciverData={""} />
            }
            <VideoPlayer />
            <audio ref={audioRef} src="/ringtone.m4a" />
        </div>

    )
}

export default CallWrapper
